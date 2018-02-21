import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

// import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';

// https://v4-alpha.getbootstrap.com/components/modal/#via-javascript
// http://jasonwatmore.com/post/2017/01/24/angular-2-custom-modal-window-dialog-box
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shrd-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSaved = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  show() {
    $(`#${this.id}`).modal({
      keyboard: false,
      backdrop: 'static'
    });
  }

  hide() {
    $(`#${this.id}`).modal('hide');
  }

  shrdModalSave() {
    this.onSaved.emit(true);
  }
}
