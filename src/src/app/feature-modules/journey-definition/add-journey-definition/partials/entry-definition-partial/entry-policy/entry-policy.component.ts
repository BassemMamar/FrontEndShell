import { Component, OnInit, AfterViewInit, ViewEncapsulation, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';

import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { WorldRegionInfo, CountryInfo } from '../../../../model/world-region-info';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { DocumentCategory } from '../../../../model/document-category';
import { CommonService } from '../../../../../../core/base/utils/common.service';
import { TreeviewItem } from 'ngx-treeview';
import { CategorySourceLisnerService, CategorySourceData } from '../category-source-lisner.service';

@Component({
  selector: 'app-entry-policy',
  templateUrl: './entry-policy.component.html',
  styleUrls: ['./entry-policy.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntryPolicyComponent implements OnInit, AfterViewInit, OnChanges {

  myOptions = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
  ];
  config = {
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: true,
    maxHeight: 500
  };
  itCategory = new TreeviewItem({
    text: 'IT', value: 9, children: [
      {
        text: 'Programming', value: 91, children: [{
          text: 'Frontend', value: 911, children: [
            { text: 'Angular 1', value: 9111 },
            { text: 'Angular 2', value: 9112 },
            { text: 'ReactJS', value: 9113 }
          ]
        }, {
          text: 'Backend', value: 912, children: [
            { text: 'C#', value: 9121 },
            { text: 'Java', value: 9122 },
            { text: 'Python', value: 9123, checked: false }
          ]
        }]
      },
      {
        text: 'Networking', value: 92, children: [
          { text: 'Internet', value: 921 },
          { text: 'Security', value: 922 }
        ]
      }
    ]
  });
  items = [this.itCategory];

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

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private categorySourceLisnerService: CategorySourceLisnerService) {
    this.selectedRegion = new Array<CountryInfo>();
    this.selectedDocumentCategories = new Array<DocumentCategory>();
  }

  ngOnInit() {
    this.copyData();
    this.categorySourceLisnerService.lisner
      .subscribe((data: CategorySourceData) => {
        if (data) {
          switch (data.operation) {
            case 'add':
              this.disableDocumentCategoriesInSource(data.documentCategory);
              break;
            case 'delete':
              this.enableDocumentCategoriesInSource(data.documentCategory);

              break;
          }
          this.refreshSelector();
        }
      });
  }
  ngOnChanges() {
    this.copyData();
  }
  copyData() {
    if (this.worldRegionInfo != null && this.worldRegionInfo.length !== 0 && this.worldRegionInfoCopy == null) {
      // this.worldRegionInfoCopy = this.commonService.deepCopy(this.worldRegionInfo);
      this.worldRegionInfoCopy = this.worldRegionInfo.slice();
    }

    if (this.documentCategories != null && this.documentCategories.length !== 0 && this.documentCategoriesCopy == null) {
      this.documentCategoriesCopy = this.commonService.deepCopy(this.documentCategories);
      // this.documentCategoriesCopy = this.documentCategories;
      this.refreshSelector();
    }

  }

  ngAfterViewInit(): void {
    this.initSelector();
  }

  addNewPolicy() {
    if (this.selectedDocumentCategories.length === 0 || this.selectedRegion.length === 0) {
      return;
    }


    const selectedDC = this.selectedDocumentCategories.slice();
    const selectedCT = this.selectedRegion.slice();
    this.documentProofPolicies.push(this.fb.group({
      documentTypes: [selectedDC],
      countries: [selectedCT]
    }));

    // this.documentCategoriesCopy.map(x => x.subCategories = x.subCategories.filter(s =>
    //   this.selectedDocumentCategories.indexOf(s) === -1
    // ));
    this.categorySourceLisnerService.lisner
      .next(new CategorySourceData(this.selectedDocumentCategories.slice(), 'add'));

    this.selectedDocumentCategories = [];
    this.selectedRegion = [];
  }

  disableDocumentCategoriesInSource(data: DocumentCategory[]) {
    this.documentCategoriesCopy
      .map(x => x.subCategories = x.subCategories.filter(s =>
        data.findIndex(d => d.level === s.level && d.friendlyName === s.friendlyName) === -1
      ));

    this.refreshSelector();
  }

  deletePolicy(index: number, policy: FormGroup) {
    this.documentProofPolicies.removeAt(index);

    // handle retturn data to category DDL
    const documentTypesFG = policy.get('documentTypes') as FormGroup;
    const documentCategories = documentTypesFG.value as DocumentCategory[];
    // documentCategories.forEach(currentCategory => {
    //   const parent = this.documentCategories.filter(x => x.subCategories.find(sx => sx.id === currentCategory.id));
    //   const parentInOrginal = this.documentCategoriesCopy.find(orginal => orginal.id === parent[0].id);
    //   parentInOrginal.subCategories.push(currentCategory);
    // });

    // this.refreshSelector();
    this.categorySourceLisnerService.lisner
      .next(new CategorySourceData(documentCategories, 'delete'));

  }

  enableDocumentCategoriesInSource(data: DocumentCategory[]) {
    data.forEach(currentCategory => {
      const parent = this.documentCategories.filter(x => x.subCategories
        .findIndex(sx => sx.level === currentCategory.level && sx.friendlyName === currentCategory.friendlyName) !== -1);
      const parentInOrginal = this.documentCategoriesCopy
        .find(dcCopy => dcCopy.level === parent[0].level && dcCopy.friendlyName === parent[0].friendlyName);
      parentInOrginal.subCategories.push(currentCategory);
    });

    this.refreshSelector();
  }

  initSelector() {
    $(this.categoriesInput.nativeElement).selectpicker({
      actionsBox: true
      // dropupAuto: false
    });
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
