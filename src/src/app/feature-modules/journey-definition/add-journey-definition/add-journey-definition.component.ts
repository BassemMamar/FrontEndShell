import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoggerService } from '../../../core/base/logger/logger.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { JourneyDefinitionInfo } from '../model/journey-definition-details';
import { JourneyDefinitionService } from '../journey-definition.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from '../../../shared/components/toastr/toastr.service';
import { EditJourneyDefinition } from '../model/edit-journey-definition';
import { EditJourneyEntryDefinition } from '../model/edit-journey-entry-definition';
import { FieldValidatorService } from '../../../shared/components/field-state-display/field-validator.service';
import { EntryType } from '../model/entry-type';
import { AlertService } from '../../../shared/components/alert/alert.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockUITemplateComponent } from '../../../shared/components/block-ui/block-ui-template.component';

@Component({
  selector: 'app-add-journey-definition',
  templateUrl: './add-journey-definition.component.html',
  styleUrls: ['./add-journey-definition.component.scss']
})
export class AddJourneyDefinitionComponent implements OnInit, AfterViewInit {
  journeyDefinitionId: string;
  journeyDefinitionData: JourneyDefinitionInfo;
  journeyDefinitionForm: FormGroup;
  submitted = false;

  get basicInfoGroup(): FormGroup {
    return this.journeyDefinitionForm.get('basicInfoGroup') as FormGroup;
  }
  get entryDefinitionGroup(): FormGroup {
    return this.journeyDefinitionForm.get('entryDefinitionGroup') as FormGroup;
  }

  get basicInfoValidationStatus() {
    return !this.basicInfoGroup.valid;
  }
  get entryDefinitionsValidationStatus() {
    return !this.entryDefinitionGroup.valid;
  }

  // Create an instance from our block ui template
  blockTemplate = BlockUITemplateComponent;

  @BlockUI('block-edit-journey-definition') blockEditJourneyDefinition: NgBlockUI;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private alertService: AlertService,
    private journeyDefinitionService: JourneyDefinitionService,
    private fieldValidatorService: FieldValidatorService,
    private loggerService: LoggerService) {

    this.journeyDefinitionData = new JourneyDefinitionInfo();
    // create new instance if add, get data if update
    this.journeyDefinitionId = this.route.snapshot.paramMap.get('journeyDefinitionId');
    if (this.journeyDefinitionId != null && this.journeyDefinitionId !== '') {
      this.getJourneyDefinition(this.journeyDefinitionId);
    } else {
      //  this.journeyDefinitionDataModel = new JourneyDefinitionDetails();
    }
    this.createMainFormGroup();

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initWizard();
  }

  getJourneyDefinition(id: string) {
    this.blockEditJourneyDefinition.start();
    this.journeyDefinitionService
      .getJourneyDefinition(id)
      .subscribe((journeyDefinition: JourneyDefinitionInfo) => {
        this.journeyDefinitionData = journeyDefinition;
        // this.createMainFormGroup();
        this.setBasicInfoGroupValues();
        this.blockEditJourneyDefinition.stop();
      },
        error => {
          this.toastrService.error(error, 'getJourneyDefinition error');
          this.blockEditJourneyDefinition.stop();
        }
      );
  }

  /**
   * Create main FormGroup for angular reactive form
   */
  createMainFormGroup() {
    this.journeyDefinitionForm = this.fb.group({
      basicInfoGroup: this.createBasicInfoGroup(),
      entryDefinitionGroup: this.createEntryDefinitionGroup(),
    });
  }

  /**
   * create new FormGroup to hold basic info section
   * default value is taken from journeyDefinitionDataModel instance for both ADD/Update cases
   * return new FormGroup instance to be hold in the main FormGroup which is journeyDefinitionForm
   */
  createBasicInfoGroup(): FormGroup {
    const _alCheck = this.journeyDefinitionData.maxAgeLimit != null || this.journeyDefinitionData.minAgeLimit != null;
    return this.fb.group({
      name: [this.journeyDefinitionData.name, Validators.required], // the FormControl called "name"
      code: [this.journeyDefinitionData.code, Validators.required],
      isActive: [this.journeyDefinitionData.isActive],
      canHaveExtraDocuments: [this.journeyDefinitionData.canHaveExtraDocuments],
      introductionMessageGroup: this.fb.group({
        imCheck: [this.journeyDefinitionData.introductionMessage !== '' ? true : false],
        imValue: [this.journeyDefinitionData.introductionMessage]
      }),
      ageLimitGroup: this.fb.group({
        alCheck: [_alCheck],
        alMinValue: [this.journeyDefinitionData.minAgeLimit],
        alMaxValue: [this.journeyDefinitionData.maxAgeLimit]
      }),
      reasons: [this.journeyDefinitionData.journeyReasons]
    });
  }

  setBasicInfoGroupValues() {
    const _alCheck = this.journeyDefinitionData.maxAgeLimit != null || this.journeyDefinitionData.minAgeLimit != null;
    this.basicInfoGroup.setValue({
      name: this.journeyDefinitionData.name,
      code: this.journeyDefinitionData.code,
      isActive: this.journeyDefinitionData.isActive,
      canHaveExtraDocuments: this.journeyDefinitionData.canHaveExtraDocuments,
      introductionMessageGroup: {
        imCheck: this.journeyDefinitionData.introductionMessage !== '' ? true : false,
        imValue: this.journeyDefinitionData.introductionMessage
      },
      ageLimitGroup: {
        alCheck: _alCheck,
        alMinValue: this.journeyDefinitionData.minAgeLimit,
        alMaxValue: this.journeyDefinitionData.maxAgeLimit
      },
      reasons: this.journeyDefinitionData.journeyReasons.map(reason => { return { display: reason, value: reason }; })
    });
  }

  /**
   * create new FormGroup to hold Entries section
   * for this one it will be empty group passed into entry component,
   * which in his turn will inject new FormAbstract and update then with values for update case
   * return new FormGroup instance to be hold in the main FormGroup which is journeyDefinitionForm
   */
  createEntryDefinitionGroup(): FormGroup {
    return this.fb.group({});
  }

  onSubmit() {
    this.submitted = true;
    if (this.journeyDefinitionForm.valid) {

      this.doSubmit();
    } else {
      // validate all form fields
      this.fieldValidatorService.validateAllFormFields(this.journeyDefinitionForm);
    }

  }

  test() {

    this.alertService.error('Update journey definition has been done successfully', 'Done!', {
      hostId: 'root',
      keepAfterRouteChange: true,
      showDuration: 0
    });
    this.router.navigate(['/JourneyDefinition']);
  }
  doSubmit() {
    const datamodel = this.toJourneyDefinitionDataModelMapper();
    // ToDo: Maybe here do some custom validation dono
    if (datamodel.journeyEntryDefinitions == null || datamodel.journeyEntryDefinitions.length === 0) {
      this.toastrService.warning('Can not have a journey definition without any entry definition', 'Data Not Valid!');
    }
    if (datamodel.journeyEntryDefinitions.length === 1 && datamodel.journeyEntryDefinitions[0].entryType === EntryType.Selfie) {
      this.toastrService.warning('Can not have a journey definition with one Selfie entry definition', 'Data Not Valid!');
    }


    if (this.journeyDefinitionId != null && this.journeyDefinitionId !== '') {
      this.journeyDefinitionService
        .updateJourneyDefinition(datamodel).subscribe(
          data => {
            this.alertService.success('Update journey definition has been done successfully', 'Done!', {
              hostId: 'root',
              keepAfterRouteChange: true,
              showDuration: 5000
            });
            this.router.navigate(['/JourneyDefinition']);
          },
          error => {
            // this.toastrService.error('Update journey definition Faild for some reason', 'Opps!');
            this.alertService.error(error, 'Update Faild!', {
              hostId: 'root',
              showDuration: 0
            });
            this.loggerService.error('Update journey definition Faild for some reason ', error);
          });

    } else {
      this.journeyDefinitionService
        .addJourneyDefinition(datamodel).subscribe(
          data => {
            this.alertService.success('Add journey definition has been done successfully', 'Done!', {
              hostId: 'root',
              keepAfterRouteChange: true,
              showDuration: 5000
            });
            this.router.navigate(['/JourneyDefinition']);
          },
          error => {
            // this.toastrService.error('Add journey definition Faild for some reason', 'Opps!');
            this.alertService.error(error, 'Add Faild!', {
              hostId: 'root',
              showDuration: 0
            });
            this.loggerService.error('Add journey definition Faild for some reason ', error);
          }
        );
    }
    // resetForm(); ToDo
  }

  toJourneyDefinitionDataModelMapper(): EditJourneyDefinition {
    const basicInfoValue = this.journeyDefinitionForm.get('basicInfoGroup').value;
    const entryDefinitionValue = this.journeyDefinitionForm.get('entryDefinitionGroup').value;

    const result = new EditJourneyDefinition();
    // fill basicInfo
    result.id = this.journeyDefinitionId;
    result.name = basicInfoValue.name;
    result.code = basicInfoValue.code;
    result.isActive = basicInfoValue.isActive;
    result.canHaveExtraDocuments = basicInfoValue.canHaveExtraDocuments;
    result.introductionMessage = basicInfoValue.introductionMessageGroup.imCheck ?
      basicInfoValue.introductionMessageGroup.imValue : '';
    if (basicInfoValue.ageLimitGroup.alCheck) {
      result.minAgeLimit = basicInfoValue.ageLimitGroup.alMinValue;
      result.maxAgeLimit = basicInfoValue.ageLimitGroup.alMaxValue;
    }
    result.journeyReasons = (<any[]>basicInfoValue.reasons).map(x => x.value);

    // fill entries
    entryDefinitionValue.entriesArray.forEach(entry => {
      const entryDataModel = this.toEntryDefinitionDataModelMapper(entry);
      result.journeyEntryDefinitions.push(entryDataModel);
    });

    this.loggerService.log('the result model is : ', result);
    return result;
  }

  toEntryDefinitionDataModelMapper(entry: any): EditJourneyEntryDefinition {

    const entryDataModel = new EditJourneyEntryDefinition();
    entryDataModel.entryType = entry.entryType;
    entryDataModel.acceptExpiredDocuments = entry.acceptExpiredDocuments;
    entryDataModel.acceptExpiredUpToMonthes = entry.isUpToMonthes ? entry.acceptExpiredUpToMonthes : null;
    entryDataModel.askForAdditionalStepsStatus = entry.askForAdditionalSteps;
    entryDataModel.canContinueOnFailure = entry.isOptional === false ? entry.canContinueOnFailure : false;
    if (entry.documentProofPolicies) {
      entryDataModel.documentProofPolicies = entry.documentProofPolicies.map(policy => {
        const rObj = { countryCodes: [], documentCategories: [] };
        rObj.countryCodes = policy.countries.map(country => country.code);
        rObj.documentCategories = policy.documentTypes.map(category => category.id);

        return rObj;
      });
    }
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

