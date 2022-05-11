import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, ResourceAuthGuard } from '@xdf/security';
import { DirtyGuard, RecordResolver } from '@xdf/gallery';
import { InputConfigurationComponent } from './input-configuration/input-configuration.component';
import { InputConfigurationDetailComponent } from './input-configuration-detail/input-configuration-detail.component';
import { MaxRecordsResolver } from './resolvers/general-parameter/max-records.resolver';
import { LineSeparatorsResolver } from './resolvers/general-parameter/line-separators.resolver';
import { SeparatorsResolver } from './resolvers/general-parameter/separators.resolver';
import { ConvertFileResolver } from './resolvers/general-parameter/convert-file.resolver';
import { DataTypeResolver } from './resolvers/general-parameter/data-type.resolver';
import { InternalEquivalenceResolver } from './resolvers/definition/internal-equivalence.resolver';


const routes: Routes = [
  {
    path: '', component: InputConfigurationComponent, canActivate: [AuthGuard, ResourceAuthGuard],
    data: {
      innerTemplate: 'none',
      program: 'INPUT_CONFIGURATION',
      breadcrumb: 'breadcrumb.configuration'
    }
  },
  {
    path: 'detail/:mode', component: InputConfigurationDetailComponent, canActivate: [AuthGuard, ResourceAuthGuard], canDeactivate: [DirtyGuard],
    resolve: {
      //record: RecordResolver,
      maxRecordsResolver: MaxRecordsResolver,
      lineSeparatorsResolver: LineSeparatorsResolver,
      separatorsResolver: SeparatorsResolver,
      convertFileResolver: ConvertFileResolver,
      dataTypeResolver: DataTypeResolver,
      internalEquivalenceResolver: InternalEquivalenceResolver
    },
    data: {
      innerTemplate: 'none',
      program: 'INPUT_CONFIGURATION',
      breadCrumb: 'breadcrumb.input-configuration.detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputConfigurationRoutingModule { }
