import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-proof-of-id-entry-type',
  templateUrl: './proof-of-id-entry-type.component.html',
  styleUrls: ['./proof-of-id-entry-type.component.scss']
})
export class ProofOfIdEntryTypeComponent implements OnInit {
  @Input() item: FormGroup;
  @Input() parentGroup: FormGroup;
  @Input() arrayName: string;
  @Input() groupName;

  @Input() index;

  constructor() { }

  ngOnInit() {
  }

}
