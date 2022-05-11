import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DirtyGuard, RecordResolver, TemplateResolver } from "@xdf/gallery";
import { AuthGuard, ResourceAuthGuard } from "@xdf/security";
import { EtlConfigurationDetailComponent } from "./views/etl-configuration-detail/etl-configuration-detail.component";
import { EtlConfigurationGridComponent } from "./views/etl-configuration-grid/etl-configuration-grid.component";

const routes: Routes = [
    {
      path: '', component: EtlConfigurationGridComponent, canActivate: [AuthGuard, ResourceAuthGuard],
      resolve: { template: TemplateResolver },
      data: {
      innerTemplate: "none",
        program: 'etl_configuration',
        breadcrumb: 'breadcrumb.etl_configuration'
      }
    }
    ,
    {
      path: "detail/new",
      component: EtlConfigurationDetailComponent,
      canActivate: [AuthGuard, ResourceAuthGuard],
      canDeactivate: [DirtyGuard],
      resolve: { record: RecordResolver },
      data: {
        mode: 'create',
        program: "etl_configuration",
        breadcrumb: "breadcrumb.etl_configuration",
        backButton: true
      },
    },
    {
      path: 'detail/edit/:code',
      component: EtlConfigurationDetailComponent,
      resolve: { record: RecordResolver },
      
      canActivate: [AuthGuard, ResourceAuthGuard], canDeactivate: [DirtyGuard],
      data:
      {
        mode: 'edit',
        program: 'etl_configuration',
        breadcrumb: 'breadcrumb.etl_configuration',
        backButton: true
      }
    },{
      path: 'detail/view/:code',
      component: EtlConfigurationDetailComponent,
      canActivate: [AuthGuard, ResourceAuthGuard],
      data:
      {
        mode: 'view',
        program: 'etl_configuration',
        breadcrumb: 'breadcrumb.etl_configuration',
        backButton: true
      }
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtlConfigurationRoutingModule { }