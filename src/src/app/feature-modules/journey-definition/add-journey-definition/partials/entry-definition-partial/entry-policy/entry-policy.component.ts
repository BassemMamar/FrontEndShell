import { Component, OnInit, AfterViewInit, ViewEncapsulation, Input, ViewChild, ElementRef, OnChanges, OnDestroy } from '@angular/core';

import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { WorldRegionInfo, CountryInfo } from '../../../../model/world-region-info';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { DocumentCategory } from '../../../../model/document-category';
import { CommonService } from '../../../../../../core/base/utils/common.service';
import { TreeviewItem } from 'ngx-treeview';
import { CategorySourceLisnerService, CategorySourceData } from '../category-source-lisner.service';
import { EntryType } from '../../../../model/entry-type';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-entry-policy',
  templateUrl: './entry-policy.component.html',
  styleUrls: ['./entry-policy.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntryPolicyComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  myOptions = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
  ];
  config = {
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 500
  };
  worldRegionInfoMapped: TreeviewItem[];


  @Input() parentType: EntryType;
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

  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private categorySourceLisnerService: CategorySourceLisnerService) {
    this.selectedRegion = new Array<CountryInfo>();
    this.selectedDocumentCategories = new Array<DocumentCategory>();
  }

  ngOnInit() {
    this.copyData();
    this.initCategoryLisner(this.parentType);

  }
  ngOnChanges() {
    this.copyData();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initCategoryLisner(entryType: EntryType) {
    switch (entryType) {
      case EntryType.ProofOfIdentity:
        this.subscription = this.categorySourceLisnerService.poiPolicyCategoryLisner
          .subscribe((data: boolean) => {
            if (data) {
              this.refreshSelector();
            }
          });
        break;

      case EntryType.ProofOfAddress:
        this.subscription = this.categorySourceLisnerService.poaPolicyCategoryLisner
          .subscribe((data: boolean) => {
            if (data) {
              this.refreshSelector();
            }
          });
        break;
    }
  }

  copyData() {
    if (this.worldRegionInfo != null && this.worldRegionInfo.length !== 0 && this.worldRegionInfoCopy == null) {
      // this.worldRegionInfoCopy = this.commonService.deepCopy(this.worldRegionInfo);
      this.worldRegionInfoCopy = this.worldRegionInfo.slice();
      this.worldRegionInfoMapped = this.toNGTreeModelMapper();
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

    this.disableDocumentCategoriesInSource(this.selectedDocumentCategories.slice());

    this.selectedDocumentCategories = [];
    this.selectedRegion = [];
  }

  disableDocumentCategoriesInSource(data: DocumentCategory[]) {
    this.documentCategories
      .map(x => x.subCategories = x.subCategories.filter(s =>
        data.findIndex(d => d.level === s.level && d.friendlyName === s.friendlyName) === -1
      ));

    this.changeCategoryEmitter();

  }

  deletePolicy(index: number, policy: FormGroup) {
    this.documentProofPolicies.removeAt(index);

    const documentTypesFG = policy.get('documentTypes') as FormGroup;
    const documentCategories = documentTypesFG.value as DocumentCategory[];


    this.enableDocumentCategoriesInSource(documentCategories);

  }

  enableDocumentCategoriesInSource(data: DocumentCategory[]) {
    data.forEach(currentCategory => {
      const parent = this.documentCategoriesCopy.filter(x => x.subCategories
        .findIndex(sx => sx.level === currentCategory.level && sx.friendlyName === currentCategory.friendlyName) !== -1);
      const parentInOrginal = this.documentCategories
        .find(dcCopy => dcCopy.level === parent[0].level && dcCopy.friendlyName === parent[0].friendlyName);
      parentInOrginal.subCategories.push(currentCategory);
    });

    this.changeCategoryEmitter();
  }

  changeCategoryEmitter() {
    switch (this.parentType) {
      case EntryType.ProofOfIdentity:
        this.categorySourceLisnerService.poiPolicyCategoryLisner.next(true);
        break;

      case EntryType.ProofOfAddress:
        this.categorySourceLisnerService.poaPolicyCategoryLisner.next(true);
        break;
    }
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

  toNGTreeModelMapper() {
    return this.worldRegionInfo.map(region => new TreeviewItem({
      text: region.name,
      value: region.id,
      checked: false,
      children: region.countries.map(contry => new TreeviewItem({
        text: contry.name,
        value: contry.code,
        checked: false
      }))
    }));

  }
}
