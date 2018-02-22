import { Component, OnInit, Input } from '@angular/core';
import { NavMenuItem } from '../../model/nav-menu-item';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'layout-nav-item-content',
  templateUrl: './nav-item-content.component.html',
  styleUrls: ['./nav-item-content.component.scss']
})
export class NavItemContentComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('nav-menu-item') navMenuItem: NavMenuItem;

  constructor() { }

  ngOnInit() {
   // this.navMenuItem
  }

}
