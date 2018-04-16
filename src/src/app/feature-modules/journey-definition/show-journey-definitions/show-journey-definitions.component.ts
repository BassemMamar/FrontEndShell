import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

import { JourneyDefinitionService } from '../journey-definition.service';
import { JourneyDefinitionSummary } from '../model/journey-definition-summary';
import { DomSanitizer } from '@angular/platform-browser';
import { LoggerService } from '../../../core/base/logger/logger.service';

@Component({
  selector: 'app-show-journey-definitions',
  templateUrl: './show-journey-definitions.component.html',
  styleUrls: ['./show-journey-definitions.component.scss']
})
export class ShowJourneyDefinitionsComponent implements OnInit, AfterViewInit {
  journeyDefinitions: JourneyDefinitionSummary[];
  @ViewChildren('journeyDefinitionsLoop') public loop: any;

  options = {
    // datasource definition
    data: {
      type: 'local',
      source: this.journeyDefinitions,
      pageSize: 10
    },

    // layout definition
    layout: {
      theme: 'default', // datatable theme
      class: '', // custom wrapper class
      scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
      // height: 450, // datatable's body's fixed height
      footer: false // display/hide footer
    },

    // column sorting
    sortable: true,

    pagination: true,

    search: {
      input: $('#generalSearch')
    },

    // inline and bactch editing(cooming soon)
    // editable: false,

    // columns definition
    columns: [{
      field: "RecordID",
      title: "#",
      width: 50,
      sortable: false,
      textAlign: 'center',
      selector: { class: 'm-checkbox--solid m-checkbox--brand' }
    },
    {
      field: "name",
      title: "Name",
      responsive: { visible: 'lg' }
    },
    {
      field: "code",
      title: "Code",
      responsive: { visible: 'lg' }
    },
    {
      field: "isActive",
      title: "Is Active",
      // callback function support for column rendering
      template: function (row) {
        var status = {
          true: { 'title': 'Active', 'state': 'success' },
          false: { 'title': 'Not Active', 'state': 'danger' }
        };
        return '<span class="m-badge m-badge--' + status[row.isActive].state + ' m-badge--dot"></span>&nbsp;<span class="m--font-bold m--font-' + status[row.isActive].state + '">' + status[row.isActive].title + '</span>';
      }
    },
    {
      field: "lastUpdateDate",
      title: "Last Update Date",
      type: "date",
      format: "MM/DD/YYYY"
    },
    {
      field: "Actions",
      width: 110,
      title: "Actions",
      sortable: false,
      overflow: 'visible',
      template: (row, index, datatable) => {
        const edit = `
        <a (click)="edit('a52e5f36-e43f-46cc-8e54-378e23ac18aa')" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit ">\
                        <i class="la la-edit"></i>\
                    </a>\
      `;
        console.log(edit);
        return edit;
      }
    }]
  };

  constructor(
    private journeyDefinitionService: JourneyDefinitionService,
    private router: Router,
    private loggerService: LoggerService) {
    this.journeyDefinitions = new Array<JourneyDefinitionSummary>();
  }

  ngOnInit() {
    this.getJourneyDefinitions();
  }

  ngAfterViewInit() {
    this.loop.changes.subscribe(
      () => {
        this.loggerService.log('ngFor loop Finishes..');
        this.createDataTable()

      }
    );


  }

  getJourneyDefinitions() {
    this.journeyDefinitionService.getJourneyDefinitions()
      .subscribe(data => {
        this.journeyDefinitions = data;
      });
  }

  createDataTable() {
    this.options.data.source = this.journeyDefinitions;
    this.options.search.input = $('#generalSearch');
    //  var datatable = $('.m_datatable').mDatatable(this.options);

    var datatable = $('.m-datatable').mDatatable({
      data: {
        saveState: { cookie: false },
      },
      search: {
        input: $('#generalSearch'),
      },
      columns: [

      ],
    });

  }

  edit(journeyDefinitionId: string) {
    this.router.navigate(['/', journeyDefinitionId]);
  }
}
