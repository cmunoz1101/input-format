import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@xdf/security';
import { DirtyGuard, TemplateResolver, CrudGridComponent, EditableDataTableTemplateResolver } from '@xdf/gallery';
import { CrudDetailComponent, FormViewComponent, ListResolver, RecordResolver } from '@xdf/gallery';
import { ResourceAuthGuard } from '@xdf/security';
import { ApplicationFormComponent, ValposFormComponent } from '@xdf/settings';
import { TabsLayoutComponent, TabsTemplateResolver } from '@xdf/layouts';

const routes: Routes = [
  {
    path: 'system-settings', component: TabsLayoutComponent,
    resolve: { template: TabsTemplateResolver },
    data: {
      templateName: 'system-settings',
    },
    children: [
      { path: 'information', component: FormViewComponent, canActivate: [AuthGuard, ResourceAuthGuard], canDeactivate: [DirtyGuard],
      resolve: { record: ListResolver },
        data: {
          option: 'information',
          program: 'system_settings_information',
          breadcrumb: 'breadcrumb.settings.information'
        }
      },
      { path: 'information/:mode', component: FormViewComponent, canActivate: [AuthGuard, ResourceAuthGuard], canDeactivate: [DirtyGuard],
      resolve: { ecord: ListResolver },
        data: {
          withoutGrid: true,
          option: 'information',
          program: 'system_settings_information',
          breadcrumb: 'breadcrumb.settings.information'
        }
      },
      { path: 'password', component: FormViewComponent, canActivate: [AuthGuard, ResourceAuthGuard], canDeactivate: [DirtyGuard],
      resolve: { record: ListResolver },
        data: {
          option: 'password',
          program: 'system_settings_password',
          breadcrumb: 'breadcrumb.settings.password'
        }
      },
      { path: 'password/:mode', component: FormViewComponent, canActivate: [AuthGuard, ResourceAuthGuard], canDeactivate: [DirtyGuard],
      resolve: { record: ListResolver },
        data: {
          withoutGrid: true,
          option: 'password',
          program: 'system_settings_password',
          breadcrumb: 'breadcrumb.settings.password'
        }
      },
      { path: 'userpolicy', component: FormViewComponent, canActivate: [AuthGuard, ResourceAuthGuard], canDeactivate: [DirtyGuard],
      resolve: { record: ListResolver },
        data: {
          option: 'userpolicy',
          program: 'system_settings_userpolicy',
          breadcrumb: 'breadcrumb.settings.userpolicy'
        }
      },
      { path: 'userpolicy/:mode', component: FormViewComponent, canActivate: [AuthGuard, ResourceAuthGuard], canDeactivate: [DirtyGuard],
      resolve: { record: ListResolver },
        data: {
          withoutGrid: true,
          option: 'userpolicy',
          program: 'system_settings_userpolicy',
          breadcrumb: 'breadcrumb.settings.userpolicy'
        }
      }
    ]
  },
  {
    path: 'application', component: CrudGridComponent, canActivate: [AuthGuard, ResourceAuthGuard],
    resolve: { template: TemplateResolver },
    data: {
      program: 'application',
      breadcrumb: 'breadcrumb.application'
    }
  },
  {
    path: 'application/detail/:mode', component: ApplicationFormComponent,
    canActivate: [AuthGuard, ResourceAuthGuard], canDeactivate: [DirtyGuard],
    resolve: { record: RecordResolver },
    data: {
      program: 'application',
      breadcrumb: 'breadcrumb.application.detail'
    }
  },
  {
    path: 'valpos', component: CrudGridComponent, canActivate: [AuthGuard, ResourceAuthGuard],
    resolve: { template: TemplateResolver },
    data: {
      program: 'valpos',
      breadcrumb: 'breadcrumb.valpos'
    }
  },
  {
    path: 'valpos/detail/:mode', component: ValposFormComponent, canActivate: [AuthGuard, ResourceAuthGuard], canDeactivate: [DirtyGuard],
    resolve: { record: RecordResolver, editableTableTemplate: EditableDataTableTemplateResolver },
    data: {
      program: 'valpos',
      breadcrumb: 'breadcrumb.valpos.detail',
      editableTableTemplate: 'valpos-detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
