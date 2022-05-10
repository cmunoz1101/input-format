import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, ResourceAuthGuard } from '@xdf/security';
import { DirtyGuard, RecordResolver, TemplateResolver } from '@xdf/gallery';
import { InputConfigurationComponent } from './input-configuration/input-configuration.component';


const routes: Routes = [
  {
    path: '', component: InputConfigurationComponent, canActivate: [AuthGuard, ResourceAuthGuard],
    //resolve: { record: TemplateResolver },
    data: {
      innerTemplate: 'none',
      program: 'INPUT_CONFIGURATION',
      breadcrumb: 'breadcrumb.configuration'
    }
  }
  //{
  //  path: 'input-configuration/detail/:mode', component: InputConfigurationDetailComponent, canActivate: [AuthGuard, ResourceAuthGuard], canDeactivate: [DirtyGuard],
  //  //resolve: { record: RecordResolver },
  //  data: {
  //    innerTemplate: 'none',
  //    program: 'INPUT_CONFIGURATION',
  //    breadCrumb: 'breadcrumb.input-configuration.detail'
  //  }
  //}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputConfigurationRoutingModule { }
