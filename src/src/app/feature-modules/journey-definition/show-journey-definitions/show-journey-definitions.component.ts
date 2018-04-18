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
        //  this.createDataTable()

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
    // Datatable give issue for angular routeLink ... later check it 
    var datatable = $('.m_datatable').mDatatable({
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
}
