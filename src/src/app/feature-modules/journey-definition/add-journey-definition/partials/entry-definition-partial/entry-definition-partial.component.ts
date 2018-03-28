import { Component, OnInit, Input, AfterViewInit, DoCheck, ChangeDetectorRef, ViewChildren, EventEmitter, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoggerService } from '../../../../../core/base/logger/logger.service';
import { JourneyEntryDefinitionDetails } from '../../../model/journey-entry-definition-details';
import { EntryType } from '../../../model/entry-type';
import { EntryDefinitionContainerComponent } from './entry-definition-container/entry-definition-container.component';
import { EntryDefinitionOptions } from '../../../model/entry-definition-options';
import { JourneyDefinitionService } from '../../../journey-definition.service';
import { EntryFormModel } from '../../../model/entry-form-model';
import { POIEntryFormModel } from '../../../model/poi-entry-form-model';
import { POAEntryFormModel } from '../../../model/poa-entry-form-model';
import { SelfieEntryFormModel } from '../../../model/selfie-entry-form-model';
import { ADEntryFormModel } from '../../../model/ad-entry-form-model';
import { ToastrService } from '../../../../../shared/components/toastr/toastr.service';
import { WorldRegionInfo } from '../../../model/world-region-info';
import { DocumentCategory } from '../../../model/document-category';
import { SupportedCaptureMediaChannelInfo } from '../../../model/supported-capture-media-channel-info';

@Component({
  selector: 'app-entry-definition-partial',
  templateUrl: './entry-definition-partial.component.html',
  styleUrls: ['./entry-definition-partial.component.scss']
})
export class EntryDefinitionPartialComponent implements OnInit, AfterViewInit, DoCheck, OnChanges {
  entryTypes = EntryType;
  entryDefinitionOptions: EntryDefinitionOptions[];
  @Input() entryDefinitionGroup: FormGroup;
  @Input() entryDefinitionDataModel: JourneyEntryDefinitionDetails[];

  @ViewChildren(EntryDefinitionContainerComponent) children: EntryDefinitionContainerComponent[];

  get primaryEntryArray(): FormArray {
    return this.entryDefinitionGroup.get('primaryEntryArray') as FormArray;
  }
  get entriesArray(): FormArray {
    return this.entryDefinitionGroup.get('entriesArray') as FormArray;
  }
  get LastEntryArray(): FormArray {
    return this.entryDefinitionGroup.get('LastEntryArray') as FormArray;
  }

  supportedCaptureMediaChannels: SupportedCaptureMediaChannelInfo[];
  worldRegionInfo: WorldRegionInfo[];
  poiDocumentCategories: DocumentCategory[];
  poaDocumentCategories: DocumentCategory[];


  options: any = {
    moves: (el, container, handle) => {
      return (<string>handle.className).endsWith('handle');
      // return handle.className === 'handle';
    }
  };

  constructor(
    private logger: LoggerService,
    private journeyDefinitionService: JourneyDefinitionService,
    private toastrService: ToastrService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder) {

  }
  public ngDoCheck(): void {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    // next calls to get countries and categories
    // for categories later will be one for each entry type
    this.getSupportedCaptureMediaChannels();
    this.getWorldRegionInfo();
    this.getPOADocumentCategories();
    this.getPOIDocumentCategories();

    this.getEntryDefinitionOptions();
    this.createEntryDefinitionGroup();
    this.initEntryDefinitionGroup(this.entryDefinitionDataModel);
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   // this.sortableInit();
    // //  this.portletInit();
    // }, 1000);
  }
  ngOnChanges() {
    this.initEntryDefinitionGroup(this.entryDefinitionDataModel);
  }

  getSupportedCaptureMediaChannels() {
    this.journeyDefinitionService
      .getSupportedCaptureMediaChannels()
      .subscribe(
      data => this.supportedCaptureMediaChannels = data
      );
  }

  getWorldRegionInfo() {
    this.journeyDefinitionService
      .getWorldRegionInfo()
      .subscribe(
      data => this.worldRegionInfo = data
      );
  }

  getPOIDocumentCategories() {
    this.journeyDefinitionService
      .getDocumentCategories(EntryType.ProofOfIdentity)
      .subscribe(
      data => this.poiDocumentCategories = data
      );
  }

  getPOADocumentCategories() {
    this.journeyDefinitionService
      .getDocumentCategories(EntryType.ProofOfAddress)
      .subscribe(
      data => this.poaDocumentCategories = data
      );
  }

  getEntryDefinitionOptions() {
    this.journeyDefinitionService
      .getEntryDefinitionOptions()
      .subscribe(
      data => this.entryDefinitionOptions = data
      );
  }

  createEntryDefinitionGroup() {
    // const primaryPOIEntry = this.fb.group(new JourneyEntryDefinitionInfo()); // this one should map proof of identity entry form model
    const primaryPOIEntry = this.fb.array(new Array<JourneyEntryDefinitionDetails>());
    this.entryDefinitionGroup.addControl('primaryEntryArray', primaryPOIEntry);

    const entries = this.fb.array(new Array<EntryFormModel>()); // this one should map array of journey entry definition
    this.entryDefinitionGroup.addControl('entriesArray', entries);


    // const optionalSelfieEntry = this.fb.group(new JourneyEntryDefinitionInfo()); // this one should map Selfie entry form model
    const optionalSelfieEntry = this.fb.array(new Array<JourneyEntryDefinitionDetails>());
    this.entryDefinitionGroup.addControl('LastEntryArray', optionalSelfieEntry);
  }

  initEntryDefinitionGroup(dataModel: JourneyEntryDefinitionDetails[]) {
    if (dataModel == null || dataModel.length === 0) {
      return;
    }

    // /**
    //  * Handle First element
    //  */
    // if (true) { // ToDo check if first entry is of type proof of identity
    //   const firstEntry = dataModel.shift(); // this should entry of type proof of identity
    //   const poi = new JourneyEntryDefinitionInfo();
    //   poi.isOptional = false; // should be false for first primary POI entry
    //   poi.order = 1; //  should be 1 for; first primary POI entry
    //   poi.entryType = firstEntry.entryType; // must be Proof of identity
    //   this.primaryEntryArray.push(this.fb.group(poi));
    //   // this.primaryPOIEntryArray.setValue( this.fb.group(new JourneyEntryDefinitionInfo()));
    // }
    // /**
    //  * Handle Last element
    //  */
    // if (true) { // ToDo check if last entry is of type selfie
    //   const lastEntry = dataModel.pop(); // this should entry of type selfie
    //   const poa = new JourneyEntryDefinitionInfo();
    //   poa.isOptional = lastEntry.isOptional;
    //   poa.order = lastEntry.order;
    //   poa.entryType = lastEntry.entryType; // must be selfie
    //   this.LastEntryArray.push(this.fb.group(poa));

    // }

    /**
     * Handle the rest of elements
     */
    const entryFGs = dataModel.map(entry => this.createNewEntryFormModel(entry.entryType, entry));

    // this.entries = this.fb.array(entryFGs); // way(1) afried to lose the refin the main form group
    entryFGs.forEach(fg => this.entriesArray.push(fg)); // way(2)
  }


  addEntryDefinition(value: EntryType) {
    switch (value) {
      case EntryType.ProofOfIdentity:
        // const poi = new POIEntryFormModel();
        // const POIgroup = this.fb.group(poi);
        // POIgroup.get('acceptExpiredUpToMonthes').disable();
        const POIgroup = this.createNewEntryFormModel(value);
        this.entriesArray.push(POIgroup);
        // if (this.primaryEntryArray.length === 0) {
        //   // this.entryDefinitionGroup.addControl('primaryEntryArray', POIgroup);
        //   this.primaryEntryArray.push(POIgroup);
        // } else {
        //   this.entriesArray.push(POIgroup);
        // }
        break;
      case EntryType.ProofOfAddress:
        // const poa = new POAEntryFormModel();
        // const POAgroup = this.fb.group(poa);
        // POAgroup.get('acceptExpiredUpToMonthes').disable();

        const POAgroup = this.createNewEntryFormModel(value);
        this.entriesArray.push(POAgroup);
        break;
      case EntryType.AdditionalDocument:
        // const ad = new ADEntryFormModel();
        // const ADgroup = this.fb.group(ad);
        const ADgroup = this.createNewEntryFormModel(value);

        this.entriesArray.push(ADgroup);
        break;
      case EntryType.Selfie:
        // const selfie = new SelfieEntryFormModel();
        // const SFgroup = this.fb.group(selfie);

        // if (this.LastEntryArray.length === 0) {
        //   // this.entryDefinitionGroup.addControl('primaryEntryArray', POIgroup);
        //   this.LastEntryArray.push(SFgroup);
        // }
        // else {
        // const dd = this.entriesArray.controls.forEach(e => this.logger.info(` e.get('entryType').value : ${e.get('entryType').value}`));
        const oldSelfie = this.entriesArray.controls.find(e => e.get('entryType').value === EntryType.Selfie);
        if (oldSelfie == null) {
          const SFgroup = this.createNewEntryFormModel(value);

          this.entriesArray.push(SFgroup);
        } else {
          // alert that is only one selfie isallowed
          this.toastrService.warning(`Journey definition can't have more than one Selfie entry definition.`);
        }
        // }

        break;

    }
    this.logger.log('addEntryDefinition value ', value);
    //  this.entryDefinitionArray.push(this.fb.group(new JourneyEntryDefinitionInfo()));
  }


  deleteEntryDefinition(index: number, source: string) {
    this.logger.log('deleteEntryDefinition index', index);
    switch (source) {
      case 'primary':
        this.primaryEntryArray.removeAt(index);
        break;
      case 'entries':
        this.entriesArray.removeAt(index);
        break;
      case 'optional':
        this.LastEntryArray.removeAt(index);
        break;
    }
  }

  expandAll() {
    this.children.forEach(container => container.expand());
  }

  collapseAll() {
    this.children.forEach(container => container.collapse());
  }



  createNewEntryFormModel(entryTypes: EntryType, entryDataModel: JourneyEntryDefinitionDetails = null): FormGroup {
    switch (entryTypes) {
      case EntryType.ProofOfIdentity:
        const poi = new POIEntryFormModel(entryDataModel);
        const POIgroup = this.fb.group({
          order: [poi.order, Validators.required],
          entryType: [entryTypes, Validators.required],
          isOptional: [poi.isOptional],
          supportedChannelTypes: [poi.supportedChannelTypes, Validators.required],
          maxAttempts: [poi.maxAttempts, Validators.required],
          askForAdditionalSteps: [poi.askForAdditionalSteps, Validators.required],
          acceptExpiredDocuments: [poi.acceptExpiredDocuments],
          isUpToMonthes: [poi.isUpToMonthes],
          acceptExpiredUpToMonthes: [{ value: poi.acceptExpiredUpToMonthes, disabled: !poi.isUpToMonthes }],
          documentProofPolicies: this.fb.array([]) // ToDo should fill exist policies
        });
        return POIgroup;

      case EntryType.ProofOfAddress:
        const poa = new POAEntryFormModel(entryDataModel);
        const POAgroup = this.fb.group({
          order: [poa.order, Validators.required],
          entryType: [entryTypes, Validators.required],
          isOptional: [poa.isOptional],
          supportedChannelTypes: [poa.supportedChannelTypes, Validators.required],
          maxAttempts: [poa.maxAttempts, Validators.required],
          acceptExpiredDocuments: [poa.acceptExpiredDocuments],
          isUpToMonthes: [poa.isUpToMonthes],
          acceptExpiredUpToMonthes: [{ value: poa.acceptExpiredUpToMonthes, disabled: !poa.isUpToMonthes }],
          documentProofPolicies: this.fb.array([]) // ToDo should fill exist policies
        });
        return POAgroup;

      case EntryType.AdditionalDocument:
        const ad = new ADEntryFormModel(entryDataModel);
        const ADgroup = this.fb.group({
          order: [ad.order, Validators.required],
          entryType: [entryTypes, Validators.required],
          isOptional: [ad.isOptional],
          supportedChannelTypes: [ad.supportedChannelTypes, Validators.required],
          maxAttempts: [ad.maxAttempts, Validators.required],
          title: [ad.title, Validators.required]
        });
        return ADgroup;

      case EntryType.Selfie:
        const selfie = new SelfieEntryFormModel(entryDataModel);
        const SFgroup = this.fb.group({
          order: [selfie.order, Validators.required],
          entryType: [entryTypes, Validators.required],
          // isOptional: [false],
          supportedChannelTypes: [selfie.supportedChannelTypes, Validators.required],
        });
        return SFgroup;

    }
  }

}
