import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { LoggerService } from '../../../../../../core/base/logger/logger.service';
import { SupportedCaptureMediaChannelInfo } from '../../../../model/supported-capture-media-channel-info';
import { FieldValidatorService } from '../../../../../../shared/components/field-state-display/field-validator.service';

@Component({
  selector: 'app-ad-entry-type',
  templateUrl: './ad-entry-type.component.html',
  styleUrls: ['./ad-entry-type.component.scss']
})
export class ADEntryTypeComponent implements OnInit, AfterViewInit {

  @Input() parentGroup: FormGroup;
  @Input() arrayName: string;
  @Input() groupName;

  @Input() index;
  @ViewChild('supportedChannelTypesInput') supportedChannelTypesInput: ElementRef;

  @Input() supportedCaptureMediaChannels: SupportedCaptureMediaChannelInfo[];

  // return current entry form group
  get currentEntryGroup(): FormGroup {
    const entriesArray = this.parentGroup.get(this.arrayName) as FormArray;
    return entriesArray.at(this.groupName) as FormGroup;
  }

  constructor(private loggerService: LoggerService, private fieldValidatorService: FieldValidatorService) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.initSelector();
  }

  initSelector() {
    $(this.supportedChannelTypesInput.nativeElement).selectpicker();
  }

  isFieldValid(field: string) {
    return this.fieldValidatorService.isFieldValid(this.currentEntryGroup, field);
  }

  displayFieldCss(field: string) {
    return this.fieldValidatorService.displayFieldCss(this.currentEntryGroup, field);
  }

}

