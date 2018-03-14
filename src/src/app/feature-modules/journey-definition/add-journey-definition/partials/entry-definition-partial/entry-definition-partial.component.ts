import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { LoggerService } from '../../../../../core/base/logger/logger.service';
import { JourneyEntryDefinitionInfo } from '../../../model/journey-entry-definition-info';
import { EntryType } from '../../../model/entry-type';

@Component({
  selector: 'app-entry-definition-partial',
  templateUrl: './entry-definition-partial.component.html',
  styleUrls: ['./entry-definition-partial.component.scss']
})
export class EntryDefinitionPartialComponent implements OnInit, AfterViewInit {
  portlet1;
  portlet2;
  portlet3;
  portlet4;
  portlet5;

  @Input() entryDefinitionGroup: FormGroup;
  @Input() entryDefinitionDataModel: JourneyEntryDefinitionInfo[];
  // primaryPOIEntryDataModel: JourneyEntryDefinitionInfo; // typeof journey entry definition
  get primaryPOIEntryArray(): FormArray {
    return this.entryDefinitionGroup.get('primaryPOIEntry') as FormArray;
  }
  get entriesArray(): FormArray {
    return this.entryDefinitionGroup.get('entriesArray') as FormArray;
  }
  get optionalSelfieEntryArray(): FormArray {
    return this.entryDefinitionGroup.get('optionalSelfieEntry') as FormArray;
  }

  entryDefinitionOptions = [
    { name: 'Proof Of Identity', value: EntryType.ProofOfIdentity },
    { name: 'Proof Of Address', value: EntryType.ProofOfAddress },
    { name: 'Additional Document', value: EntryType.AdditionalDocument },
    { name: 'Selfie', value: EntryType.Selfie }
  ];

  constructor(
    private logger: LoggerService,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    const ff = this.entryDefinitionGroup;
    this.createEntryDefinitionGroup();
    this.initEntryDefinitionGroup(this.entryDefinitionDataModel);
  }

  ngAfterViewInit() {
    setTimeout(() => {
     // this.sortableInit();
      this.portletInit();
    }, 1000);
  }

  createEntryDefinitionGroup() {
    // const primaryPOIEntry = this.fb.group(new JourneyEntryDefinitionInfo()); // this one should map proof of identity entry form model
    const primaryPOIEntry = this.fb.array(new Array<JourneyEntryDefinitionInfo>());
    this.entryDefinitionGroup.addControl('primaryPOIEntry', primaryPOIEntry);

    const entries = this.fb.array(new Array<JourneyEntryDefinitionInfo>()); // this one should map array of journey entry definition
    this.entryDefinitionGroup.addControl('entriesArray', entries);


    // const optionalSelfieEntry = this.fb.group(new JourneyEntryDefinitionInfo()); // this one should map Selfie entry form model
    const optionalSelfieEntry = this.fb.array(new Array<JourneyEntryDefinitionInfo>());
    this.entryDefinitionGroup.addControl('optionalSelfieEntry', optionalSelfieEntry);
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
      this.primaryPOIEntryArray.push(this.fb.group(poi));
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
      this.optionalSelfieEntryArray.push(this.fb.group(poa));

    }

    /**
     * Handle the rest of elements
     */
    const entryFGs = dataModel.map(entry => this.fb.group(entry));
    // this.entries = this.fb.array(entryFGs); // way(1) afried to lose the refin the main form group
    entryFGs.forEach(fg => this.entriesArray.push(fg)); // way(2)
  }


  addEntryDefinition(value: EntryType) {
    switch (value) {
      case EntryType.ProofOfIdentity:
        const POIEntry = new JourneyEntryDefinitionInfo();
        POIEntry.entryType = EntryType.ProofOfIdentity;
        const POIgroup = this.fb.group(POIEntry);

        if (this.primaryPOIEntryArray.length === 0) {
          // this.entryDefinitionGroup.addControl('primaryPOIEntry', POIgroup);
          this.primaryPOIEntryArray.push(POIgroup);
        } else {
          this.entriesArray.push(POIgroup);
        }
        break;
      case EntryType.ProofOfAddress:
        const POAEntry = new JourneyEntryDefinitionInfo();
        POAEntry.entryType = EntryType.ProofOfAddress;
        const POAgroup = this.fb.group(POAEntry);

        this.entriesArray.push(POAgroup);
        break;
      case EntryType.AdditionalDocument:
        const ADEntry = new JourneyEntryDefinitionInfo();
        ADEntry.entryType = EntryType.AdditionalDocument;
        const ADgroup = this.fb.group(ADEntry);

        this.entriesArray.push(ADgroup);
        break;
      case EntryType.Selfie:
        const SFEntry = new JourneyEntryDefinitionInfo();
        SFEntry.entryType = EntryType.Selfie;
        const SFgroup = this.fb.group(SFEntry);

        if (this.optionalSelfieEntryArray.length === 0) {
          // this.entryDefinitionGroup.addControl('primaryPOIEntry', POIgroup);
          this.optionalSelfieEntryArray.push(SFgroup);
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


  deleteEntryDefinition(value: string) {
    this.logger.log('deleteEntryDefinition ', value);
    return false;
    // ToDo
    // https://embed.plnkr.co/uifYPiyvCfpuRcwcrm2K/
  }



  sortableInit() {
    $('#m_sortable_portlets').sortable({
      connectWith: '.m-portlet__head',
      items: '.m-portlet',
      opacity: 0.8,
      handle: '.m-portlet__head',
      forceHelperSize: true,
      placeholder: 'm-portlet--sortable-placeholder',
      forcePlaceholderSize: true,
      helper: 'clone',
      tolerance: 'pointer',
      cancel: '.m-portlet--sortable-empty', // cancel dragging if portlet is in fullscreen mode
      revert: 250, // animation in milliseconds
      // update: function (b, c) {
      //   if (c.item.prev().hasClass('m-portlet--sortable-empty')) {
      //     c.item.prev().before(c.item);
      //   }
      // },
      start: function (e, ui) {
        // creates a temporary attribute on the element with the old index
        $(this).attr('data-previndex', ui.item.index());
      },
      update: function (e, ui) {
        // gets the new and old index then removes the temporary attribute
        const newIndex = ui.item.index();
        const oldIndex = $(this).attr('data-previndex');
      //  $(this).removeAttr('data-previndex');
      }
    });


  }

  portletInit() {
    const temp = $('#m_portlet_tools_1');
    if (temp != null) {
      this.portlet1 = $('#m_portlet_tools_1').mPortlet();

    }
    this.portlet2 = $('#m_portlet_tools_2').mPortlet();
    this.portlet3 = $('#m_portlet_tools_3').mPortlet();
    this.portlet4 = $('#m_portlet_tools_4').mPortlet();
    //  this.portlet5 = $('#m_portlet_tools_5').mPortlet();

    // == Remove event handlers
    this.portlet1.on('beforeRemove', function (portlet) {

      // return confirm('Are you sure to remove this portlet ?');  // remove portlet after user confirmation
    });

    this.portlet1.on('afterRemove', (portlet) => {
      this.logger.log('deleteEntryDefinition afterRemove');

    });

  }

  expandAll() {
    if (this.portlet1 != null) {
      this.portlet1.expand();
    }
    this.portlet2.expand();
    this.portlet3.expand();
    this.portlet4.expand();
    //  this.portlet5.expand();
  }

  collapseAll() {
    if (this.portlet1 != null) {
      this.portlet1.collapse();
    }
    this.portlet2.collapse();
    this.portlet3.collapse();
    this.portlet4.collapse();
    // this.portlet5.collapse();
  }

}
