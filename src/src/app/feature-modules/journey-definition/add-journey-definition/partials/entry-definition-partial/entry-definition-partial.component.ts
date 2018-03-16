import { Component, OnInit, Input, AfterViewInit, DoCheck, ChangeDetectorRef, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { LoggerService } from '../../../../../core/base/logger/logger.service';
import { JourneyEntryDefinitionInfo } from '../../../model/journey-entry-definition-info';
import { EntryTypes } from '../../../model/entry-types';
import { EntryDefinitionContainerComponent } from './entry-definition-container/entry-definition-container.component';

@Component({
  selector: 'app-entry-definition-partial',
  templateUrl: './entry-definition-partial.component.html',
  styleUrls: ['./entry-definition-partial.component.scss']
})
export class EntryDefinitionPartialComponent implements OnInit, AfterViewInit, DoCheck {
  entryTypes = EntryTypes;
  @Input() entryDefinitionGroup: FormGroup;
  @Input() entryDefinitionDataModel: JourneyEntryDefinitionInfo[];
  // primaryPOIEntryDataModel: JourneyEntryDefinitionInfo; // typeof journey entry definition
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

  entryDefinitionOptions = [
    { name: 'Proof Of Identity', value: EntryTypes.ProofOfIdentity },
    { name: 'Proof Of Address', value: EntryTypes.ProofOfAddress },
    { name: 'Additional Document', value: EntryTypes.AdditionalDocument },
    { name: 'Selfie', value: EntryTypes.Selfie }
  ];
  options: any = {
    moves: (el, container, handle) => {
      return (<string>handle.className).endsWith('handle');
      // return handle.className === 'handle';
    }
  };

  constructor(
    private logger: LoggerService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder) {

  }
  public ngDoCheck(): void {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    const ff = this.entryDefinitionGroup;
    this.createEntryDefinitionGroup();
    this.initEntryDefinitionGroup(this.entryDefinitionDataModel);
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   // this.sortableInit();
    // //  this.portletInit();
    // }, 1000);
  }

  createEntryDefinitionGroup() {
    // const primaryPOIEntry = this.fb.group(new JourneyEntryDefinitionInfo()); // this one should map proof of identity entry form model
    const primaryPOIEntry = this.fb.array(new Array<JourneyEntryDefinitionInfo>());
    this.entryDefinitionGroup.addControl('primaryEntryArray', primaryPOIEntry);

    const entries = this.fb.array(new Array<JourneyEntryDefinitionInfo>()); // this one should map array of journey entry definition
    this.entryDefinitionGroup.addControl('entriesArray', entries);


    // const optionalSelfieEntry = this.fb.group(new JourneyEntryDefinitionInfo()); // this one should map Selfie entry form model
    const optionalSelfieEntry = this.fb.array(new Array<JourneyEntryDefinitionInfo>());
    this.entryDefinitionGroup.addControl('LastEntryArray', optionalSelfieEntry);
  }

  initEntryDefinitionGroup(dataModel: JourneyEntryDefinitionInfo[]) {
    if (dataModel == null || dataModel.length === 0) {
      return;
    }

    /**
     * Handle First element
     */
    if (true) { // ToDo check if first entry is of type proof of identity
      const firstEntry = dataModel.shift(); // this should entry of type proof of identity
      const poi = new JourneyEntryDefinitionInfo();
      poi.isOptional = false; // should be false for first primary POI entry
      poi.order = 1; //  should be 1 for; first primary POI entry
      poi.entryType = firstEntry.entryType; // must be Proof of identity
      this.primaryEntryArray.push(this.fb.group(poi));
      // this.primaryPOIEntryArray.setValue( this.fb.group(new JourneyEntryDefinitionInfo()));
    }

    /**
     * Handle Last element
     */
    if (true) { // ToDo check if last entry is of type selfie
      const lastEntry = dataModel.pop(); // this should entry of type selfie
      const poa = new JourneyEntryDefinitionInfo();
      poa.isOptional = lastEntry.isOptional;
      poa.order = lastEntry.order;
      poa.entryType = lastEntry.entryType; // must be selfie
      this.LastEntryArray.push(this.fb.group(poa));

    }

    /**
     * Handle the rest of elements
     */
    const entryFGs = dataModel.map(entry => this.fb.group(entry));
    // this.entries = this.fb.array(entryFGs); // way(1) afried to lose the refin the main form group
    entryFGs.forEach(fg => this.entriesArray.push(fg)); // way(2)
  }


  addEntryDefinition(value: EntryTypes) {
    switch (value) {
      case EntryTypes.ProofOfIdentity:
        const POIEntry = new JourneyEntryDefinitionInfo();
        POIEntry.entryType = EntryTypes.ProofOfIdentity;
        const POIgroup = this.fb.group(POIEntry);

        if (this.primaryEntryArray.length === 0) {
          // this.entryDefinitionGroup.addControl('primaryEntryArray', POIgroup);
          this.primaryEntryArray.push(POIgroup);
        } else {
          this.entriesArray.push(POIgroup);
        }
        break;
      case EntryTypes.ProofOfAddress:
        const POAEntry = new JourneyEntryDefinitionInfo();
        POAEntry.entryType = EntryTypes.ProofOfAddress;
        const POAgroup = this.fb.group(POAEntry);

        this.entriesArray.push(POAgroup);
        break;
      case EntryTypes.AdditionalDocument:
        const ADEntry = new JourneyEntryDefinitionInfo();
        ADEntry.entryType = EntryTypes.AdditionalDocument;
        const ADgroup = this.fb.group(ADEntry);

        this.entriesArray.push(ADgroup);
        break;
      case EntryTypes.Selfie:
        const SFEntry = new JourneyEntryDefinitionInfo();
        SFEntry.entryType = EntryTypes.Selfie;
        const SFgroup = this.fb.group(SFEntry);

        if (this.LastEntryArray.length === 0) {
          // this.entryDefinitionGroup.addControl('primaryEntryArray', POIgroup);
          this.LastEntryArray.push(SFgroup);
        }
        // else {
        // const dd = this.entriesArray.controls.forEach(e => this.logger.info(` e.get('entryType').value : ${e.get('entryType').value}`));
        //   const oldSelfie = this.entriesArray.controls.find(e => e.get('entryType').value === EntryType.Selfie);
        //   if (oldSelfie == null) {
        //     this.entriesArray.push(SFgroup);
        //   } else {
        //     // alert that is only one selfie isallowed
        //   }
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
    // if (this.portlet1 != null) {
    //   this.portlet1.expand();
    // }
    // this.portlet2.expand();
    // this.portlet3.expand();
    // this.portlet4.expand();
    //  this.portlet5.expand();
  }

  collapseAll() {
    this.children.forEach(container => container.collapse());
    // if (this.portlet1 != null) {
    //   this.portlet1.collapse();
    // }
    // this.portlet2.collapse();
    // this.portlet3.collapse();
    // this.portlet4.collapse();
    // this.portlet5.collapse();
  }

}
