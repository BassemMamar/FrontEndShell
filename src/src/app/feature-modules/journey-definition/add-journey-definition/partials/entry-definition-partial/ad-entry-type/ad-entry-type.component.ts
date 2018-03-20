import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoggerService } from '../../../../../../core/base/logger/logger.service';

@Component({
  selector: 'app-ad-entry-type',
  templateUrl: './ad-entry-type.component.html',
  styleUrls: ['./ad-entry-type.component.scss']
})
export class ADEntryTypeComponent implements OnInit, AfterViewInit {


  @Input() item: FormGroup;
  @Input() parentGroup: FormGroup;
  @Input() arrayName: string;
  @Input() groupName;

  @Input() index;
  @ViewChild('supportedChannelTypesInput') supportedChannelTypesInput: ElementRef;

  constructor(private loggerService: LoggerService) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.initSelector();
  }

  initSelector() {
    $(this.supportedChannelTypesInput.nativeElement).selectpicker();
  }


}

