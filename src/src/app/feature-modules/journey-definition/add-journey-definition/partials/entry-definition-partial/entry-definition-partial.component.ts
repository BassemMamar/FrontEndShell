import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-definition-partial',
  templateUrl: './entry-definition-partial.component.html',
  styleUrls: ['./entry-definition-partial.component.scss']
})
export class EntryDefinitionPartialComponent implements OnInit {
  portlet1;
  portlet2;
  portlet3;
  portlet4;
  portlet5;

  constructor() { }

  ngOnInit() {
    this.sortableInit();
    this.portletInit();
  }

  sortableInit() {
    $('#m_sortable_portlets').sortable({
      connectWith: '.m-portlet__head',
      items: '.m-portlet',
      opacity: 0.8,
      handle: '.m-portlet__head',
      forceHelperSize: true,
      placeholder: 'm-portlet--sortable-placeholder',
      forcePlaceholderSize: true,
      helper: 'clone',
      tolerance: 'pointer',
      cancel: '.m-portlet--sortable-empty', // cancel dragging if portlet is in fullscreen mode
      revert: 250, // animation in milliseconds
      update: function (b, c) {
        if (c.item.prev().hasClass('m-portlet--sortable-empty')) {
          c.item.prev().before(c.item);
        }
      }
    });


  }



  portletInit() {
    this.portlet1 = $('#m_portlet_tools_1').mPortlet();
    this.portlet2 = $('#m_portlet_tools_2').mPortlet();
    this.portlet3 = $('#m_portlet_tools_3').mPortlet();
    this.portlet4 = $('#m_portlet_tools_4').mPortlet();
  //  this.portlet5 = $('#m_portlet_tools_5').mPortlet();
  }

  expandAll() {
    this.portlet1.expand();
    this.portlet2.expand();
    this.portlet3.expand();
    this.portlet4.expand();
  //  this.portlet5.expand();
  }

  collapseAll() {
    this.portlet1.collapse();
    this.portlet2.collapse();
    this.portlet3.collapse();
    this.portlet4.collapse();
   // this.portlet5.collapse();
  }

}
