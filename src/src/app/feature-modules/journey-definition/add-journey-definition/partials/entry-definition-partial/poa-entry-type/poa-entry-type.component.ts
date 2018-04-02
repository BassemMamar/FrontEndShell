import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { CommonService } from '../../../../../../core/base/utils/common.service';
import { CaptureMediaChannels } from '../../../../model/capture-media-channels';
import { WorldRegionInfo } from '../../../../model/world-region-info';
import { DocumentCategoryInfo } from '../../../../model/document-category-info';
import { EntryType } from '../../../../model/entry-type';
import { FieldValidatorService } from '../../../../../../shared/components/field-state-display/field-validator.service';

@Component({
  selector: 'app-poa-entry-type',
  templateUrl: './poa-entry-type.component.html',
  styleUrls: ['./poa-entry-type.component.scss']
})
export class POAEntryTypeComponent implements OnInit, AfterViewInit {
  entryType = EntryType;

  @Input() parentGroup: FormGroup;
  @Input() arrayName: string;
  @Input() groupName;

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
    private common: CommonService,
    private fieldValidatorService: FieldValidatorService) { }

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
