import { Component, OnInit, Input } from '@angular/core';
import { NavMenuItem } from '../../model/nav-menu-item';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'layout-aside-nav-item',
  templateUrl: './aside-nav-item.component.html',
  styleUrls: ['./aside-nav-item.component.scss']
})
export class AsideNavItemComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('nav-menu-item') navMenuItem: NavMenuItem;

  constructor() { }

  ngOnInit() {
  }

}
