import { Injectable } from '@angular/core';

import * as shrdToastr from 'toastr';
import { ToasrtDefaultOptions } from './model/toastr-options';

@Injectable()
export class ToasrtService {
    toastr = shrdToastr;
    constructor() {
        this.toastr.options = ToasrtDefaultOptions;
    }
}
