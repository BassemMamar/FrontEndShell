import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SubDomainService } from './sub-domain.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CommunicationConfigService {

    // subject: BehaviorSubject<any>;
    private _authority: string;
    private _businessCode: string;
    private _api: any;
    private _visionCortexBasePath: string;

    constructor(private subDomainService: SubDomainService) {
        //  this.subject = new BehaviorSubject(environment);
        this.init();
    }

    public get businessCode(): string {
        return this._businessCode;
    }

    public get authority(): string {
        return this._authority;
    }

    public get api(): any {
        return this._api;
    }

    public get visionCortexBasePath(): string {
        return this._visionCortexBasePath;
    }

    //////////////////////

    private init(): any {
        this._businessCode = this.subDomainService.subDomain;
      //  this._authority = this.injectBusinessCode(environment.authority);
        this._visionCortexBasePath = this.injectBusinessCode(environment.visionCortexBasePath);

        this._api = environment.api;
        this._api.url = this.injectBusinessCode(this._api.url);
    }

    private injectBusinessCode(url: string): string {
        if (this._businessCode) {
            const splitedBasePath = url.replace('//', '').split('.');

            if (this._businessCode.toLocaleLowerCase() !== splitedBasePath[0].toLocaleLowerCase()) {
                const returnApiUrl = url.replace('//', '//' + this._businessCode + '.');
                return returnApiUrl;
            }
        }
        return url;
    }

}
