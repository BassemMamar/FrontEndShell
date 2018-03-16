import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { CommonService } from '../../../../../../core/base/utils/common.service';
import { MediaAcquisitionChannelType } from '../../../../model/media-acquisition-channel-Type';

@Component({
  selector: 'app-proof-of-id-entry-type',
  templateUrl: './proof-of-id-entry-type.component.html',
  styleUrls: ['./proof-of-id-entry-type.component.scss']
})
export class ProofOfIdEntryTypeComponent implements OnInit, AfterViewInit {

  @Input() item: FormGroup;
  @Input() parentGroup: FormGroup;
  @Input() arrayName: string;
  @Input() groupName;

  @Input() index;
  @ViewChild('tempp') test: any;
  tempp
  constructor(private common: CommonService) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.initTouchSpin();
    this.initSelector();
  }
  initSelector() {
    $('.selector').selectpicker();
  }

  initTouchSpin() {
    $(this.test).TouchSpin({
      min: 1,
      max: 3,
      step: 1,
      decimals: 0,
      boostat: 5,
      maxboostedstep: 10
    });

  }

}
