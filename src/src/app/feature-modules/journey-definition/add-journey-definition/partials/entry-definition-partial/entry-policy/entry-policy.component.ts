import { Component, OnInit, AfterViewInit, ViewEncapsulation, Input, ViewChild, ElementRef, OnChanges, OnDestroy } from '@angular/core';

import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { WorldRegionInfo, CountryInfo } from '../../../../model/world-region-info';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { DocumentCategoryInfo, DocumentTypeInfo } from '../../../../model/document-category-info';
import { CommonService } from '../../../../../../core/base/utils/common.service';
import { TreeviewItem } from 'ngx-treeview';
import { CategorySourceLisnerService, CategorySourceData } from '../category-source-lisner.service';
import { EntryType } from '../../../../model/entry-type';
import { Subscription } from 'rxjs/Subscription';
import { LoggerService } from '../../../../../../core/base/logger/logger.service';

@Component({
  selector: 'app-entry-policy',
  templateUrl: './entry-policy.component.html',
  styleUrls: ['./entry-policy.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntryPolicyComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('bootstrapMultiselecIinput') bootstrap_multiselect_input: ElementRef;

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
  documentCategoriesMapped: TreeviewItem[];

  /**
   * in Reactive Forms when we want to bind properties inside an FormArray, we should wrap them with parent FormGroup
   * that's why we need to pass the parent of current FormArray
   * parentType ==> ProofOfIdentity Or ProofOfAddress
   * parentGroup ==> current entry form group which is inside 'entriesArray' FormArray
   * arrayName ==> 'documentProofPolicies'
   */
  @Input() parentType: EntryType;
  @Input() parentGroup: FormGroup;
  @Input() arrayName: string;

  @Input() worldRegionInfo: WorldRegionInfo[];
  @Input() documentCategories: DocumentCategoryInfo[];

  @ViewChild('categoriesInput') categoriesInput: ElementRef;
  @ViewChild('countriesInput') countriesInput: ElementRef;

  // copy the original one coz it will be modified
  worldRegionInfoCopy: WorldRegionInfo[];
  documentCategoriesCopy: DocumentCategoryInfo[];

  selectedRegion: CountryInfo[];
  selectedDocumentTypes: DocumentTypeInfo[];
  selectedDocumentTypesTEST = [];

  get documentProofPolicies(): FormArray {
    return this.parentGroup.get(this.arrayName) as FormArray;
  }

  // PolicyCategoryLisner subscripber reference to be unsubscribe OnDestroy component
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private loggerService: LoggerService,
    private categorySourceLisnerService: CategorySourceLisnerService) {
    this.selectedRegion = new Array<CountryInfo>();
    this.selectedDocumentTypes = new Array<DocumentTypeInfo>();
  }

  ngOnInit() {
    this.copyData();
    this.initCategoryLisner(this.parentType);

  }

  ngAfterViewInit() {
    //  this.initSelector();
    // this.initMultiselect();
  }

  ngOnChanges() {
    this.copyData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * share information between entries components to handle categories duplication issue
   * @param entryType entry type to know which lisnet we are going to subscribe
   */
  initCategoryLisner(entryType: EntryType) {
    switch (entryType) {
      case EntryType.ProofOfIdentity:
        this.subscription = this.categorySourceLisnerService.poiPolicyCategoryLisner
          .subscribe((data: boolean) => {
            if (data) {
              this.selectedDocumentTypes = [];
              this.selectedRegion = [];
              this.refreshSelector();
            }
          });
        break;

      case EntryType.ProofOfAddress:
        this.subscription = this.categorySourceLisnerService.poaPolicyCategoryLisner
          .subscribe((data: boolean) => {
            if (data) {
              this.selectedDocumentTypes = [];
              this.selectedRegion = [];
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
      this.worldRegionInfoMapped = this.toWorldRegionNGTreeModelMapper();
    }

    if (this.documentCategories != null && this.documentCategories.length !== 0 && this.documentCategoriesCopy == null) {
      this.documentCategoriesCopy = this.commonService.deepCopy(this.documentCategories);
      // this.documentCategoriesCopy = this.documentCategories;
      this.documentCategoriesMapped = this.toDocumentCategoriesNGTreeModelMapper();
      this.refreshSelector();
    }
  }

  addNewPolicy() {
    if (this.selectedDocumentTypes.length === 0 || this.selectedRegion.length === 0) {
      return;
    }

    const selectedDT = this.selectedDocumentTypes.slice();
    const selectedCT = this.selectedRegion.slice();
    this.documentProofPolicies.push(this.fb.group({
      documentTypes: [selectedDT],
      countries: [selectedCT]
    }));

    this.disableDocumentCategoriesInSource(this.selectedDocumentTypes.slice());

    this.selectedDocumentTypes = [];
    this.selectedRegion = [];
  }

  /**
   * remove selected categories/types from the list when add them as a new policy field
   * @param data selected Document Types to be removed from the source
   */
  disableDocumentCategoriesInSource(data: DocumentTypeInfo[]) {
    // this to remove just selected types and keep there brothers and parent **
    // this.documentCategories
    //   .map(x => x.documentTypes = x.documentTypes.filter(s =>
    //     data.findIndex(d => d.id === s.id && d.typeName === s.typeName && d.categoryName === s.categoryName) === -1
    //   ));


    const categoriesToBeRemoved = new Array<DocumentCategoryInfo>();
    this.documentCategories
      .forEach(x => {
        let removeParent = false;
        x.documentTypes.forEach(s => {
          const existinternal
            = data.find(d => d.id === s.id && d.typeName === s.typeName && d.categoryName === s.categoryName) !== undefined;
          if (!removeParent) {
            removeParent = existinternal;
          }
        });

        if (removeParent) {
          categoriesToBeRemoved.push(x);
        }
      });

    categoriesToBeRemoved.forEach(item => {
      this.documentCategories.splice(this.documentCategories.indexOf(item), 1);

    });

    this.changeCategoryEmitter();
  }

  deletePolicy(index: number, policy: FormGroup) {
    this.documentProofPolicies.removeAt(index);

    const documentTypesFG = policy.get('documentTypes') as FormGroup;
    const documentCategories = documentTypesFG.value as DocumentTypeInfo[];


    this.enableDocumentCategoriesInSource(documentCategories);

  }

  /**
 * return categories/types back to the list when delete them from the policy
 * @param data deleted Document Types to be added again to the source
 */
  enableDocumentCategoriesInSource(data: DocumentTypeInfo[]) {
    // this to remove just selected types and keep there brothers and parent **
    // data.forEach(currentType => {
    //   const parent = this.documentCategoriesCopy.filter(x => x.documentTypes
    //     .findIndex(sx => sx.id === currentType.id && sx.typeName === currentType.typeName
    //       && sx.categoryName === currentType.categoryName) !== -1);
    //   const parentInOrginal = this.documentCategories
    //     .find(dcCopy => dcCopy.categoryName === parent[0].categoryName);
    //   parentInOrginal.documentTypes.push(currentType);
    // });

    data.forEach(currentType => {
      const parent = this.documentCategoriesCopy.filter(x => x.documentTypes
        .findIndex(sx => sx.id === currentType.id && sx.typeName === currentType.typeName
          && sx.categoryName === currentType.categoryName) !== -1);

      const parentInOrginal = this.documentCategories
        .find(dcCopy => dcCopy.categoryName === parent[0].categoryName);
      if (parentInOrginal == null) {
        const i = this.documentCategoriesCopy.findIndex(d => d === parent[0]);
        // this.documentCategories.push(parent[0]);
        this.documentCategories.splice(i, 0, parent[0]);
      }

    });

    this.changeCategoryEmitter();
  }

  /**
   * simplt notify other entries that there is change in the category source
   * please update yourselves :)
   */
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
    // setTimeout(() => {
    //   $(this.categoriesInput.nativeElement).selectpicker('refresh');
    //   $(this.countriesInput.nativeElement).selectpicker('refresh');
    // }, 10);

    // this.documentCategoriesMapped
    //   .map(x => x.children = x.children.filter(s =>
    //     this.selectedDocumentTypesTEST.findIndex(d => d === s.value) === -1
    //   ));
    this.documentCategoriesMapped = this.toDocumentCategoriesNGTreeModelMapper();

    this.documentCategoriesMapped.forEach(treeItem => treeItem.setCheckedRecursive(false));
    this.worldRegionInfoMapped.forEach(treeItem => treeItem.setCheckedRecursive(false));
  }




  toDocumentCategoriesNGTreeModelMapper() {
    return this.documentCategories.map(category => new TreeviewItem({
      text: category.categoryName,
      value: category.categoryName,
      checked: false,
      disabled: false,
      children: category.documentTypes.map(type => new TreeviewItem({
        text: type.typeName,
        value: type,
        checked: false,
        disabled: false
      }))
    }));

  }

  toWorldRegionNGTreeModelMapper() {
    return this.worldRegionInfo.map(region => new TreeviewItem({
      text: region.name,
      value: region.id,
      checked: false,
      children: region.countries.map(contry => new TreeviewItem({
        text: contry.name,
        value: contry,
        checked: false
      }))
    }));

  }

  initMultiselect() {
    $(this.bootstrap_multiselect_input.nativeElement).multiselect({
      enableCollapsibleOptGroups: true,
      enableClickableOptGroups: true
    });
    //  $('#example-enableCollapsibleOptGroups-collapsed-container .caret-container').click();
  }


  categoryChange(value) {
    if (value == null || value.length === 0) {
      return;
    }
    this.loggerService.log('categoryChange ', value);
    this.selectedDocumentTypesTEST = value;
  }
}
