import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Injectable()
export class FieldValidatorService {

    constructor() { }

    isFieldValid(group: FormGroup, field: string) {
        return group.get(field).invalid &&
            (group.get(field).dirty || group.get(field).touched);
    }

    displayFieldCss(group: FormGroup, field: string) {
        return {
            'has-danger': this.isFieldValid(group, field),
            'has-feedback': this.isFieldValid(group, field)
        };
    }


    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            } else if (control instanceof FormArray) {
                (<FormArray>control).controls.forEach(arrElement => {
                    if (arrElement instanceof FormControl) {
                        arrElement.markAsTouched({ onlySelf: true });
                    } else if (arrElement instanceof FormGroup) {
                        this.validateAllFormFields(arrElement);
                    }
                });

            }
        });
    }
}
