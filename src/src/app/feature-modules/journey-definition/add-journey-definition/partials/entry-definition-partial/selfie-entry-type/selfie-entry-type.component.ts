import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../../../../../../core/base/utils/common.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { JourneyDefinitionDetails } from '../../../../model/journey-definition-details';
import { SupportedCaptureMediaChannelInfo } from '../../../../model/supported-capture-media-channel-info';

@Component({
  selector: 'app-selfie-entry-type',
  templateUrl: './selfie-entry-type.component.html',
  styleUrls: ['./selfie-entry-type.component.scss']
})
export class SelfieEntryTypeComponent implements OnInit, AfterViewInit {

  @Input() parentGroup: FormGroup;
  @Input() arrayName: string;
  @Input() groupName;
  @Input() index;
  @ViewChild('supportedChannelTypesInput') supportedChannelTypesInput: ElementRef;

  @Input() supportedCaptureMediaChannels: SupportedCaptureMediaChannelInfo[];

  constructor(private common: CommonService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initSelector();
  }

  initSelector() {
    $(this.supportedChannelTypesInput.nativeElement).selectpicker();
  }



  initFormGroup() {

  }

}
