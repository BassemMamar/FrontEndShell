import { Component, OnInit, AfterViewInit, ViewEncapsulation, Input, ViewChild, ElementRef } from '@angular/core';

import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { WorldRegionInfo, CountryInfo } from '../../../../model/world-region-info';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { DocumentCategory } from '../../../../model/document-category';
import { CommonService } from '../../../../../../core/base/utils/common.service';
import { TreeviewItem } from 'ngx-treeview';

@Component({
  selector: 'app-entry-policy',
  templateUrl: './entry-policy.component.html',
  styleUrls: ['./entry-policy.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntryPolicyComponent implements OnInit, AfterViewInit {
  RegionsTest = [
    {
      id: '1',
      name: 'Reg 1',
      countries: [
        {
          code: 'AF',
          name: 'Afghanistan',
        },
        {
          code: 'PL',
          name: 'Poland',
        },
        {
          code: 'SA',
          name: 'Saudi Arabia',
        }
      ]
    },
    {
      id: '2',
      name: 'Reg 2',
      countries: [
        {
          code: 'RO',
          name: 'Romania',
        },
        {
          code: 'SE',
          name: 'Sweden',
        },
        {
          code: 'AE',
          name: 'United Arab Emirates',
        }
      ]
    }
  ];
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

  constructor(private fb: FormBuilder, private commonService: CommonService) {

  }

  ngOnInit() {
    // this.worldRegionInfoCopy = this.commonService.deepCopy(this.worldRegionInfo);
    // this.documentCategoriesCopy = this.commonService.deepCopy(this.documentCategories);
    this.worldRegionInfoCopy = this.worldRegionInfo.slice();
    this.documentCategoriesCopy = this.documentCategories;
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
