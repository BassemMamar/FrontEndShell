import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { CommonService } from '../../../../../../core/base/utils/common.service';
import { SupportedCaptureMediaChannels } from '../../../../model/supported-capture-media-channels';
import { WorldRegionInfo } from '../../../../model/world-region-info';
import { DocumentCategory } from '../../../../model/document-category';

@Component({
  selector: 'app-poa-entry-type',
  templateUrl: './poa-entry-type.component.html',
  styleUrls: ['./poa-entry-type.component.scss']
})
export class POAEntryTypeComponent implements OnInit, AfterViewInit {


  @Input() item: FormGroup;
  @Input() parentGroup: FormGroup;
  @Input() arrayName: string;
  @Input() groupName;

  @Input() supportedCaptureMediaChannels: SupportedCaptureMediaChannels[];
  @Input() worldRegionInfo: WorldRegionInfo[];
  @Input() documentCategories: DocumentCategory[];

  @Input() index;
  @ViewChild('supportedChannelTypesInput') supportedChannelTypesInput: ElementRef;

  // return current entry form group
  get documentProofPoliciesParentGroup(): FormGroup {
    const entriesArray = this.parentGroup.get(this.arrayName) as FormArray;
    return entriesArray.at(this.groupName) as FormGroup;
  }
  documentProofPoliciesArrayName = 'documentProofPolicies';

  constructor(private common: CommonService) { }

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
      this.item.controls['acceptExpiredUpToMonthes'].setValue('');
      this.item.controls['acceptExpiredUpToMonthes'].disable();
    } else {
      this.item.controls['acceptExpiredUpToMonthes'].enable();
    }
  }

}
