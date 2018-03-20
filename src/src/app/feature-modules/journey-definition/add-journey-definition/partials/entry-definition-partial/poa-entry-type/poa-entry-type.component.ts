import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonService } from '../../../../../../core/base/utils/common.service';

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

  @Input() index;
  @ViewChild('supportedChannelTypesInput') supportedChannelTypesInput: ElementRef;

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
