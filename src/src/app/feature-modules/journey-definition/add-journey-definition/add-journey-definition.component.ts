import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoggerService } from '../../../core/base/logger/logger.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { JourneyDefinitionDetails } from '../model/journey-definition-details';
import { JourneyDefinitionService } from '../journey-definition.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from '../../../shared/components/toastr/toastr.service';
import { EditJourneyDefinition } from '../model/edit-journey-definition';
import { EditJourneyEntryDefinition } from '../model/edit-journey-entry-definition';

@Component({
  selector: 'app-add-journey-definition',
  templateUrl: './add-journey-definition.component.html',
  styleUrls: ['./add-journey-definition.component.scss']
})
export class AddJourneyDefinitionComponent implements OnInit, AfterViewInit {
  journeyDefinitionId: string;
  journeyDefinitionDataModel: JourneyDefinitionDetails;
  journeyDefinitionForm: FormGroup; // journeyDefinitionForm is of type FormGroup
  constructor(
    private fb: FormBuilder, // inject FormBuilder
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private journeyDefinitionService: JourneyDefinitionService,
    private logger: LoggerService) {
    /**
     * create new instance if add(for now this one)
     * get data if update
     */
    this.journeyDefinitionId = this.route.snapshot.paramMap.get('journeyDefinitionId');
    if (this.journeyDefinitionId != null && this.journeyDefinitionId !== '') {
      this.getJourneyDefinition();
    } else {
      this.journeyDefinitionDataModel = new JourneyDefinitionDetails();
    }

    this.createForm();
  }
  getJourneyDefinition() {
    this.journeyDefinitionService
      .getJourneyDefinition(this.journeyDefinitionId)
      .subscribe(
      (journeyDefinition: JourneyDefinitionDetails) => this.journeyDefinitionDataModel = journeyDefinition,
      error => this.toastrService.error(error, 'getJourneyDefinition error')
      );
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

  onSubmit() {
    const datamodel = this.prepareDataModel();
    // ToDo: Maybe here do some custom validation dono
    if (this.journeyDefinitionId != null && this.journeyDefinitionId !== '') {
      this.journeyDefinitionService
        .updateJourneyDefinition(datamodel).subscribe(/* error handling */);

    } else {
      this.journeyDefinitionService
        .addJourneyDefinition(datamodel).subscribe(/* error handling */);
    }
  }

  prepareDataModel(): EditJourneyDefinition {
    const basicInfoFormModel = this.journeyDefinitionForm.get('basicInfoGroup').value;
    const entryDefinitionFormModel = this.journeyDefinitionForm.get('entryDefinitionGroup').value;


    const result = new EditJourneyDefinition();
    // fill basicInfo
    result.id = this.journeyDefinitionId;
    result.name = basicInfoFormModel.name;
    result.code = basicInfoFormModel.code;
    result.isActive = basicInfoFormModel.isActive;
    result.introductionMessage = basicInfoFormModel.introductionMessageGroup.imCheck ?
      basicInfoFormModel.introductionMessageGroup.imValue : '';
    if (basicInfoFormModel.ageLimitGroup.alCheck) {
      result.minAgeLimit = basicInfoFormModel.ageLimitGroup.alMinValue;
      result.maxAgeLimit = basicInfoFormModel.ageLimitGroup.alMaxValue;
    }
    result.journeyReasons = (<any[]>basicInfoFormModel.reasons).map(x => x.value);

    // fill entries
    entryDefinitionFormModel.entriesArray.forEach(entry => {
      const entryDataModel = this.prepareEntrtDataModel(entry);
      result.journeyEntryDefinitions.push(entryDataModel);
    });

    this.logger.log('the result model is : ', result);
    return result;
  }

  prepareEntrtDataModel(entry): EditJourneyEntryDefinition {

    const entryDataModel = new EditJourneyEntryDefinition();
    entryDataModel.entryType = entry.entryType;
    entryDataModel.acceptExpiredDocuments = entry.acceptExpiredDocuments;
    entryDataModel.acceptExpiredUpToMonthes = entry.isUpToMonthes ? entry.acceptExpiredUpToMonthes : 0;
    entryDataModel.askForAdditionalStepsStatus = entry.askForAdditionalSteps;
    entryDataModel.documentProofPolicies = entry.documentProofPolicies.map(policy => {
      const rObj = { countryCodes: [], documentTypes: [] };
      rObj.countryCodes = policy.countries.map(country => country.code);
      rObj.documentTypes = policy.documentTypes.map(category => {
        return {
          level: category.id,
          friendlyName: category.friendlyName
        };
      });

      return rObj;
    });
    entryDataModel.isOptional = entry.isOptional;
    entryDataModel.maxAttempts = entry.maxAttempts;
    entryDataModel.order = entry.order;
    entryDataModel.supportedChannelTypes = entry.supportedChannelTypes;
    entryDataModel.title = entry.title;
    entryDataModel.order = entry.order;


    return entryDataModel;
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

