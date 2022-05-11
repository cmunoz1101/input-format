import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Definition } from '@xdf/gallery';
import { GeneralParameterService } from '../../services/general-parameter.service';

@Injectable()
export class MaxRecordsResolver implements Resolve<Definition> {
    
    constructor(protected generalParameterService: GeneralParameterService) {}

    resolve(route: ActivatedRouteSnapshot): any {
        return this.generalParameterService.getValueByKey('input-configuration-max-records');   
    }

}