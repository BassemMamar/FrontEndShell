import { Component, OnInit, AfterViewInit, ViewEncapsulation, Input, ViewChild, ElementRef } from '@angular/core';

import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { WorldRegionInfo, CountryInfo } from '../../../../model/world-region-info';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { DocumentCategory } from '../../../../model/document-category';
import { CommonService } from '../../../../../../core/base/utils/common.service';

@Component({
  selector: 'app-entry-policy',
  templateUrl: './entry-policy.component.html',
  styleUrls: ['./entry-policy.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntryPolicyComponent implements OnInit, AfterViewInit {

  @Input() worldRegionInfo: WorldRegionInfo[];
  @Input() documentCategories: DocumentCategory[];
  @Input() parentGroup: FormGroup;
  @Input() arrayName: string;
  @ViewChild('categoriesInput') categoriesInput: ElementRef;
  @ViewChild('countriesInput') countriesInput: ElementRef;

  worldRegionInfoCopy: WorldRegionInfo[];
  documentCategoriesCopy: DocumentCategory[];
  selectedRegion: CountryInfo[];
  selectedDocumentCategories: DocumentCategory[];

  get documentProofPolicies(): FormArray {
    return this.parentGroup.get(this.arrayName) as FormArray;
  }

  constructor(private fb: FormBuilder, private commonService: CommonService) {

  }

  ngOnInit() {
    this.worldRegionInfoCopy = this.commonService.deepCopy(this.worldRegionInfo);
    this.documentCategoriesCopy = this.commonService.deepCopy(this.documentCategories);
  }

  ngAfterViewInit(): void {
    this.initSelector();
  }

  addNewPolicy() {
    this.documentCategoriesCopy.map(x => x.subCategories = x.subCategories.filter(s =>
      this.selectedDocumentCategories.indexOf(s) === -1
    ));

    // // const ffff = this.documentCategoriesCopy[0].subCategories.filter(x => this.selectedDocumentCategories.indexOf(x) === -1);
    //  this.documentCategoriesCopy[0].subCategories = [this.documentCategoriesCopy[0].subCategories[0]];

    // this.documentCategoriesCopy[0].friendlyName = 'temp';
    const selectedDC = this.selectedDocumentCategories.slice();
    const selectedCT = this.selectedRegion.slice();
    this.documentProofPolicies.push(this.fb.group({
      documentTypes: [selectedDC],
      countries: [selectedCT]
    }));

    this.selectedDocumentCategories = [];
    this.selectedRegion = [];
    this.refreshSelector();
  }

  deletePolicy(index: number, policy: FormGroup) {
    this.documentProofPolicies.removeAt(index);

    // handle retturn data to category DDL
    const documentTypesFG = policy.get('documentTypes') as FormGroup;
    const documentTypes = documentTypesFG.value as DocumentCategory[];
    documentTypes.forEach(currentCategory => {
      const parent = this.documentCategories.filter(x => x.subCategories.find(sx => sx.id === currentCategory.id));
      const parentInOrginal = this.documentCategoriesCopy.find(orginal => orginal.id === parent[0].id);
      parentInOrginal.subCategories.push(currentCategory);
    });

    this.refreshSelector();

  }

  initSelector() {
    $(this.categoriesInput.nativeElement).selectpicker();
    $(this.countriesInput.nativeElement).selectpicker('refresh');
  }

  refreshSelector() {
    setTimeout(() => {
      $(this.categoriesInput.nativeElement).selectpicker('refresh');
      $(this.countriesInput.nativeElement).selectpicker('refresh');
    }, 10);
  }

  initMultiselect() {
    $('#test').multiselect({
      enableCollapsibleOptGroups: true,
      enableClickableOptGroups: true,
      buttonContainer: '<div id="example-enableCollapsibleOptGroups-collapsed-container" />'
    });
    $('#example-enableCollapsibleOptGroups-collapsed-container .caret-container').click();
  }
}
