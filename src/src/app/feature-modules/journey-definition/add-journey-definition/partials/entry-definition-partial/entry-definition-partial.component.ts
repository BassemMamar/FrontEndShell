import { Component, OnInit, Input, AfterViewInit, DoCheck, ChangeDetectorRef, ViewChildren, EventEmitter, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoggerService } from '../../../../../core/base/logger/logger.service';
import { JourneyEntryDefinitionInfo } from '../../../model/journey-entry-definition-details';
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
import { DocumentCategoryInfo } from '../../../model/document-category-info';
import { CaptureMediaChannels } from '../../../model/capture-media-channels';
import { CategorySourceLisnerService } from './category-source-lisner.service';

@Component({
  selector: 'app-entry-definition-partial',
  templateUrl: './entry-definition-partial.component.html',
  styleUrls: ['./entry-definition-partial.component.scss'],
  providers: [CategorySourceLisnerService]
})
export class EntryDefinitionPartialComponent implements OnInit, AfterViewInit, DoCheck, OnChanges {
  // ref for entry types to use in the template with ng-Switch
  entryType = EntryType;
  entryDefinitionOptions: EntryDefinitionOptions[];

  // FormGroup container for everything related to entry definitions
  @Input() entryDefinitionGroup: FormGroup;

  // entryDefinitions Data come from the server to be filled in the UI in Update case
  @Input() entryDefinitionData: JourneyEntryDefinitionInfo[];

  // refs for all entries containers to use for expandAll or collapseAll
  @ViewChildren(EntryDefinitionContainerComponent) children: EntryDefinitionContainerComponent[];

  // not used for now, but it could be binefet when there is a requirement for first or main entries
  get primaryEntryArray(): FormArray {
    return this.entryDefinitionGroup.get('primaryEntryArray') as FormArray;
  }

  // FormArray which will contain entries inside
  get entriesArray(): FormArray {
    return this.entryDefinitionGroup.get('entriesArray') as FormArray;
  }

  // not used for now, but it could be binefet when there is a requirement for last or optional entries
  get LastEntryArray(): FormArray {
    return this.entryDefinitionGroup.get('LastEntryArray') as FormArray;
  }

  /**
   * next info is required for each entry
   * so instead of call the server each time we create new entry,
   * will call the server one time here to bring the data and pass it for each new entry
   */
  captureMediaChannels: CaptureMediaChannels[];
  worldRegionInfo: WorldRegionInfo[];
  poiDocumentCategories: DocumentCategoryInfo[];
  poaDocumentCategories: DocumentCategoryInfo[];


  // options for drag/drop stuff
  dragulaOptions: any = {
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
    private fb: FormBuilder) { }

  /**
   * Lifecycle hook that is called when Angular dirty checks a directive.
   * we needed to allow change happen after we create new <app-entry-definition-container> component
   * which in turn create new entry inside
   */
  ngDoCheck() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    // next calls to get countries and categories
    // for categories later will be one for each entry type
    this.getCaptureMediaChannels();
    this.getWorldRegionInfo();
    this.getPOADocumentCategories();
    this.getPOIDocumentCategories();
    this.getEntryDefinitionOptions();

    this.createEntryDefinitionGroup();
    this.initEntryDefinitionGroup(this.entryDefinitionData);
  }

  ngAfterViewInit() {
  }

  /**
   * This event fired each time Input variables get new value
   * so we call initEntryDefinitionGroup here so that whenever data comes
   * from the server and be passed into this component
   */
  ngOnChanges() {
    this.initEntryDefinitionGroup(this.entryDefinitionData);
  }

  getCaptureMediaChannels() {
    this.journeyDefinitionService
      .getCaptureMediaChannels()
      .subscribe(data => this.captureMediaChannels = data);
  }

  getWorldRegionInfo() {
    this.journeyDefinitionService
      .getWorldRegionInfo()
      .subscribe(data => this.worldRegionInfo = data);
  }

  getPOIDocumentCategories() {
    this.journeyDefinitionService
      .getDocumentCategories(EntryType.ProofOfIdentity)
      .subscribe(data => 
        this.poiDocumentCategories = data
        );
  }

  getPOADocumentCategories() {
    this.journeyDefinitionService
      .getDocumentCategories(EntryType.ProofOfAddress)
      .subscribe(data => this.poaDocumentCategories = data);
  }

  /**
   * return list of entry definitions which the user is
   * able to add an instance of in the journey definition.
   * for new they are fixed in the client, but maybe we can get them from the server
   */
  getEntryDefinitionOptions() {
    this.journeyDefinitionService
      .getEntryDefinitionOptions()
      .subscribe(data => this.entryDefinitionOptions = data);
  }

  createEntryDefinitionGroup() {
    // For now no need for this but will keep it for future change :)
    const primaryPOIEntry = this.fb.array(new Array<JourneyEntryDefinitionInfo>());
    this.entryDefinitionGroup.addControl('primaryEntryArray', primaryPOIEntry);

    /**
     * this one should map array of journey entry definition
     * Validators.required for the array means that everything required inside it should be valid
     */
    const entries = this.fb.array(new Array<EntryFormModel>(), Validators.required);
    this.entryDefinitionGroup.addControl('entriesArray', entries);

    // For now no need for this but will keep it for future change :)
    const optionalSelfieEntry = this.fb.array(new Array<JourneyEntryDefinitionInfo>());
    this.entryDefinitionGroup.addControl('LastEntryArray', optionalSelfieEntry);
  }

  /**
   * map each entry data model comes from the server into entry form model to be used in the reactive form
   * then each mapped form group will be added to entriesArray  which hold whole entries
   * @param dataModel data from the server in the update case, if null method do nothing
   */
  initEntryDefinitionGroup(dataModel: JourneyEntryDefinitionInfo[]) {
    if (dataModel == null || dataModel.length === 0) {
      return;
    }

    const entryFGs = dataModel.map(entry => this.createAndInitEntryFormModel(entry.entryType, entry));
    entryFGs.forEach(fg => this.entriesArray.push(fg));
  }

  /**
  * simply add new entry GormGroup with default values to the entriesArray
  * @param entryType to determine which entry we are going to create
  */
  addEntryDefinition(value: EntryType) {
    switch (value) {
      case EntryType.ProofOfIdentity:
        const POIgroup = this.createAndInitEntryFormModel(value);
        this.entriesArray.push(POIgroup);
        break;

      case EntryType.ProofOfAddress:
        const POAgroup = this.createAndInitEntryFormModel(value);
        this.entriesArray.push(POAgroup);
        break;

      case EntryType.AdditionalDocument:
        const ADgroup = this.createAndInitEntryFormModel(value);
        this.entriesArray.push(ADgroup);
        break;

      case EntryType.Selfie:
        const oldSelfie = this.entriesArray.controls.find(e => e.get('entryType').value === EntryType.Selfie);
        if (oldSelfie == null) {
          const SFgroup = this.createAndInitEntryFormModel(value);
          this.entriesArray.push(SFgroup);
        } else {
          // alert that is only one selfie isallowed
          this.toastrService.warning(`Journey definition can't have more than one Selfie entry definition.`, 'Data Not Valid!');
        }
        break;

    }
  }

  /**
   * simply delete selected entry definition from the list
   * @param index entry index which we want to delete
   * @param source is one of these values: 'optional', 'primary' and 'entries', for now just 'entries' is being used
   */
  deleteEntryDefinition(index: number, source: string) {
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

  /**
   * called each time we want to add entry definition
   * according to entry type will create FormControls with default values
   * models like POIEntryFormModel, POAEntryFormModel, ADEntryFormModel and SelfieEntryFormModel
   * is used to facilitate filling values eigher from entryDataModel parameters or default ones
   * @param entryType to determine which entry we are going to create
   * @param entryDataModel used in update case to set old data as default values
   * return new entry FormGroup
   */
  createAndInitEntryFormModel(entryType: EntryType, entryDataModel: JourneyEntryDefinitionInfo = null): FormGroup {
    switch (entryType) {
      case EntryType.ProofOfIdentity:
        const poi = new POIEntryFormModel(entryDataModel);
        const POIgroup = this.fb.group({
          order: [poi.order, Validators.required],
          entryType: [entryType, Validators.required],
          isOptional: [poi.isOptional],
          supportedChannelTypes: [poi.supportedChannelTypes, Validators.required],
          maxAttempts: [poi.maxAttempts, [Validators.required, Validators.min(1), Validators.max(3)]],
          askForAdditionalSteps: [poi.askForAdditionalSteps, Validators.required],
          acceptExpiredDocuments: [poi.acceptExpiredDocuments],
          isUpToMonthes: [poi.isUpToMonthes],
          acceptExpiredUpToMonthes: [{ value: poi.acceptExpiredUpToMonthes, disabled: !poi.isUpToMonthes }],
          canContinueOnFailure: [poi.canContinueOnFailure],
          documentProofPolicies: this.fb.array([]) // ToDo should fill exist policies
        });
        return POIgroup;

      case EntryType.ProofOfAddress:
        const poa = new POAEntryFormModel(entryDataModel);
        const POAgroup = this.fb.group({
          order: [poa.order, Validators.required],
          entryType: [entryType, Validators.required],
          isOptional: [poa.isOptional],
          supportedChannelTypes: [poa.supportedChannelTypes, Validators.required],
          maxAttempts: [poa.maxAttempts, [Validators.required, Validators.min(1), Validators.max(3)]],
          acceptExpiredDocuments: [poa.acceptExpiredDocuments],
          isUpToMonthes: [poa.isUpToMonthes],
          acceptExpiredUpToMonthes: [{ value: poa.acceptExpiredUpToMonthes, disabled: !poa.isUpToMonthes }],
          canContinueOnFailure: [poa.canContinueOnFailure],
          documentProofPolicies: this.fb.array([]) // ToDo should fill exist policies
        });
        return POAgroup;

      case EntryType.AdditionalDocument:
        const ad = new ADEntryFormModel(entryDataModel);
        const ADgroup = this.fb.group({
          order: [ad.order, Validators.required],
          entryType: [entryType, Validators.required],
          isOptional: [ad.isOptional],
          supportedChannelTypes: [ad.supportedChannelTypes, Validators.required],
          //  maxAttempts: [ad.maxAttempts, [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
          canContinueOnFailure: [ad.canContinueOnFailure],
          title: [ad.title, Validators.required]
        });
        return ADgroup;

      case EntryType.Selfie:
        const selfie = new SelfieEntryFormModel(entryDataModel);
        const SFgroup = this.fb.group({
          order: [selfie.order, Validators.required],
          entryType: [entryType, Validators.required],
          isOptional: [selfie.isOptional],
          maxAttempts: [selfie.maxAttempts, [Validators.required, Validators.min(1), Validators.max(3)]],
          canContinueOnFailure: [selfie.canContinueOnFailure],
          supportedChannelTypes: [selfie.supportedChannelTypes, Validators.required],
        });
        return SFgroup;

    }
  }

  expandAll() {
    this.children.forEach(container => container.expand());
  }

  collapseAll() {
    this.children.forEach(container => container.collapse());
  }

  isEntriesArrayEmpty(field: string) {
    return this.entriesArray.length === 0;
  }

  displayEntriesArrayEmptyCss(field: string) {
    return {
      'has-danger': this.isEntriesArrayEmpty(field)
    };
  }

}
