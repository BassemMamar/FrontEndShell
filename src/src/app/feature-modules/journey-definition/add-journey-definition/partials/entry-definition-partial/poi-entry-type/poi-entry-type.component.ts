import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { CommonService } from '../../../../../../core/base/utils/common.service';
import { LoggerService } from '../../../../../../core/base/logger/logger.service';
import { WorldRegionInfo } from '../../../../model/world-region-info';
import { DocumentCategoryInfo } from '../../../../model/document-category-info';
import { CaptureMediaChannels } from '../../../../model/capture-media-channels';
import { FieldValidatorService } from '../../../../../../shared/components/field-state-display/field-validator.service';
import { EntryType } from '../../../../model/entry-type';

@Component({
  selector: 'app-poi-entry-type',
  templateUrl: './poi-entry-type.component.html',
  styleUrls: ['./poi-entry-type.component.scss']
})
export class POIEntryTypeComponent implements OnInit, AfterViewInit {
  // needed to current entry type to the <app-entry-policy> instance
  entryType = EntryType;

  @Input() parentGroup: FormGroup;
  @Input() arrayName: string;
  @Input() groupName: number;

  @Input() captureMediaChannels: CaptureMediaChannels[];
  @Input() worldRegionInfo: WorldRegionInfo[];
  @Input() documentCategories: DocumentCategoryInfo[];

  @Input() index;
  @ViewChild('supportedChannelTypesInput') supportedChannelTypesInput: ElementRef;

  // return current entry form group
  get currentEntryGroup(): FormGroup {
    const entriesArray = this.parentGroup.get(this.arrayName) as FormArray;
    return entriesArray.at(this.groupName) as FormGroup;
  }
  documentProofPoliciesArrayName = 'documentProofPolicies';

  constructor(
    private loggerService: LoggerService,
    private fieldValidatorService: FieldValidatorService,
    private common: CommonService) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.initSelector();
  }
  initSelector() {
    $(this.supportedChannelTypesInput.nativeElement).selectpicker();
  }


  onChange(value: boolean) {
    if (!value) {
      this.currentEntryGroup.controls['acceptExpiredUpToMonthes'].setValue('');
      this.currentEntryGroup.controls['acceptExpiredUpToMonthes'].disable();
    } else {
      this.currentEntryGroup.controls['acceptExpiredUpToMonthes'].enable();
    }
  }

  isFieldValid(field: string) {
    return this.fieldValidatorService.isFieldValid(this.currentEntryGroup, field);
  }

  displayFieldCss(field: string) {
    return this.fieldValidatorService.displayFieldCss(this.currentEntryGroup, field);
  }

}
