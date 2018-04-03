import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { EntryType } from '../../../../model/entry-type';
import { LoggerService } from '../../../../../../core/base/logger/logger.service';

@Component({
  selector: 'app-entry-definition-container',
  templateUrl: './entry-definition-container.component.html',
  styleUrls: ['./entry-definition-container.component.scss']
})
export class EntryDefinitionContainerComponent implements OnInit, AfterViewInit {
  private portletref: any;
  id = 'm_portlet_tools_';

  @Input() index: number;
  @Input() item: FormGroup;
  @Output() deleteEmitter = new EventEmitter<number>();

  get order() {
    return this.item.get('order') as FormControl;
  }

  constructor(private logger: LoggerService) {
    this.id += this.getunique();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initPortlet();
  }

  entryTypeName() {
    const entryType = this.item.get('entryType') as FormControl;
    if (entryType == null) {
      return 'entryType is null..';
    }

    switch (entryType.value) {
      case EntryType.ProofOfIdentity:
        return 'Proof Of Identity';
      case EntryType.ProofOfAddress:
        return 'Proof Of Address';
      case EntryType.AdditionalDocument:
        return 'Additional Document';
      case EntryType.Selfie:
        return 'Selfie';
    }
  }

  initPortlet() {
    this.portletref = $(`#${this.id}`).mPortlet();
  }

  getunique(): string {
    return new Date().getMilliseconds().toString();
  }

  delete(index: number) {
    return this.deleteEmitter.emit(index);
  }

  expand() {
    this.portletref.expand();
  }

  collapse() {
    this.portletref.collapse();
  }
}
