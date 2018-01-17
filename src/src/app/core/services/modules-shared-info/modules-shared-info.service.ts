import { Injectable } from '@angular/core';

@Injectable()
export class ModulesSharedInfoService {
    private currentModule: string;

    constructor() { }

    get CurrentModule(): string {
        return this.currentModule;
    }

    set CurrentModule(value: string) {
        this.currentModule = value;
    }
}
