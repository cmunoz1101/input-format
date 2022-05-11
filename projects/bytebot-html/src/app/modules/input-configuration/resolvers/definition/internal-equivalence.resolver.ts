import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Definition } from '@xdf/gallery';
import { DefinitionService } from '../../services/definition.service';

@Injectable()
export class InternalEquivalenceResolver implements Resolve<Definition> {

    constructor(protected definitionService: DefinitionService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        return this.definitionService.getinternalEquivalence();
    }

}