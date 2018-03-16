import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { SelfieEntryTypeInfo } from '../../../../model/selfie-entry-type-Info';
import { MediaAcquisitionChannelType } from '../../../../model/media-acquisition-channel-Type';
import { CommonService } from '../../../../../../core/base/utils/common.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-selfie-entry-type',
  templateUrl: './selfie-entry-type.component.html',
  styleUrls: ['./selfie-entry-type.component.scss']
})
export class SelfieEntryTypeComponent implements OnInit, AfterViewInit {

  @Input() selfieEntryTypeInfo: SelfieEntryTypeInfo
  @Input() selfieEntryTypeGroup: FormGroup;
  channelTypes: any;

  constructor(private common: CommonService, private formBuilder: FormBuilder) {
    this.channelTypes = this.getChannelTypes();
    this.initFormGroup();
  }

  private getChannelTypes() {
    let channelTypes: any = [];
    let MediaAcquisitionChannelTypeList = this.common.getEnumNamesAndValues(MediaAcquisitionChannelType);
    MediaAcquisitionChannelTypeList.forEach(pair => {
      let type = { 'id': pair.value.toString(), 'name': pair.name };
      channelTypes.push(type);
    });
    return channelTypes;
  }

  ngAfterViewInit(): void {
    this.initSelector();
  }
  initFormGroup() {
    this.selfieEntryTypeGroup = this.formBuilder.group({
      mediaType: ['']
    });
    this.selfieEntryTypeGroup.controls['mediaType'].valueChanges.subscribe(media =>
      this.selfieEntryTypeInfo.supportedChannelTypes = media
    )
  }

  initSelector() {
    $('#media_type').selectpicker();
  }

  ngOnInit() {
  }

}