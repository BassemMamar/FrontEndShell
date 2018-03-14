import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoggerService } from '../../../core/base/logger/logger.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { JourneyDefinitionInfo } from '../model/journey-definition-info';

@Component({
  selector: 'app-add-journey-definition',
  templateUrl: './add-journey-definition.component.html',
  styleUrls: ['./add-journey-definition.component.scss']
})
export class AddJourneyDefinitionComponent implements OnInit, AfterViewInit {
  journeyDefinitionDataModel: JourneyDefinitionInfo;
  journeyDefinitionForm: FormGroup; // journeyDefinitionForm is of type FormGroup
  constructor(
    private fb: FormBuilder, // inject FormBuilder
    private logger: LoggerService) {
    /**
     * create new instance if add(for now this one)
     * get data if update
     */
    this.journeyDefinitionDataModel = new JourneyDefinitionInfo();
    this.createForm();
  }

  createForm() {
    this.journeyDefinitionForm = this.fb.group({
      basicInfoGroup: this.createBasicInfoGroup(),
      // entryDefinitionArray: this.createEntryDefinitionArray(),
      entryDefinitionGroup: this.createEntryDefinitionGroup(),
    });
  }

  createBasicInfoGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required], // the FormControl called "name"
      code: ['', Validators.required],
      isActive: [false],
      introductionMessageGroup: this.fb.group({
        imCheck: [false],
        imValue: ['']
      }),
      ageLimitGroup: this.fb.group({
        alCheck: [false],
        alMinValue: [18],
        alMaxValue: [25]
      }),
      reasons: [[]]
    });
  }

  createEntryDefinitionGroup(): FormGroup {
    return this.fb.group({});

    // return this.fb.array([]); // entryDefinition as an empty FormArray;
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.initWizard();
  }

  initWizard() {
    const wizard = $('#m_wizard').mWizard();
    // == Validation before going to next page

    wizard.on('beforeNext', (wzrd: any) => {
      // this.logger.log('beforeNext', wzrd);
      // if (validator.form() !== true) {
      //   return false;  // don't go to the next step
      // }
    });

    // == Change event
    wizard.on('change', (wzrd: any) => {
      //  this.logger.log('change', wzrd);
      // mApp.scrollTop();
      // if (wzrd.currentStep === 1) {
      //   wzrd.goFirst();
      // }
    });
  }
}

