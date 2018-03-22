import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MediaAcquisitionChannelType } from '../../../../model/media-acquisition-channel-Type';
import { CommonService } from '../../../../../../core/base/utils/common.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { JourneyDefinitionDetails } from '../../../../model/journey-definition-details';

@Component({
  selector: 'app-selfie-entry-type',
  templateUrl: './selfie-entry-type.component.html',
  styleUrls: ['./selfie-entry-type.component.scss']
})
export class SelfieEntryTypeComponent implements OnInit, AfterViewInit {

  // @Input() selfieEntryTypeInfo: JourneyDefinitionInfo;
  // @Input() selfieEntryTypeGroup: FormGroup;
  channelTypes: any;

  @Input() item: FormGroup;
  @Input() parentGroup: FormGroup;
  @Input() arrayName: string;
  @Input() groupName;
  @Input() index;
  @ViewChild('supportedChannelTypesInput') supportedChannelTypesInput: ElementRef;

  constructor(private common: CommonService, private formBuilder: FormBuilder) {
    // this.channelTypes = this.getChannelTypes();
    //  this.initFormGroup();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initSelector();
  }

  initSelector() {
    $(this.supportedChannelTypesInput.nativeElement).selectpicker();
  }

  // private getChannelTypes() {
  //   const channelTypes: any = [];
  //   const MediaAcquisitionChannelTypeList = this.common.getEnumNamesAndValues(MediaAcquisitionChannelType);
  //   MediaAcquisitionChannelTypeList.forEach(pair => {
  //     const type = { 'id': pair.value.toString(), 'name': pair.name };
  //     channelTypes.push(type);
  //   });
  //   return channelTypes;
  // }

  initFormGroup() {
    // this.selfieEntryTypeGroup = this.formBuilder.group({
    //   mediaType: ['']
    // });
    // this.selfieEntryTypeGroup.controls['mediaType'].valueChanges.subscribe(media =>
    //   this.selfieEntryTypeInfo.supportedChannelTypes = media
    // );
  }

}
