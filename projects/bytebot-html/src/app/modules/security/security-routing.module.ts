import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@xdf/security';
import { TemplateResolver, CrudDetailComponent, DirtyGuard, GridViewComponent, CrudGridComponent, RecordResolver } from '@xdf/gallery';
import { ResourceAuthGuard } from '@xdf/security';
import { UserRoleFormComponent, AccessDetailResolver } from '@xdf/settings';

const routes: Routes = [
  {
    path: 'user-role', component: GridViewComponent, canActivate: [AuthGuard, ResourceAuthGuard],
    resolve: { template: TemplateResolver },
    data: {
      program: 'user_role',
      breadcrumb: 'breadcrumb.user.role'
    }
  },
  {
    path: 'user-role/detail/:mode', component: UserRoleFormComponent, canActivate: [AuthGuard, ResourceAuthGuard],
    canDeactivate: [DirtyGuard],
    resolve: { record: RecordResolver, accessList: AccessDetailResolver },
    data: {
      program: 'user_role',
      breadcrumb: 'breadcrumb.user.role.detail'
    }
  },
  {
    path: 'user', component: CrudGridComponent, canActivate: [AuthGuard, ResourceAuthGuard],
    resolve: { template: TemplateResolver },
    data: {
      innerTemplate: 'none',
      program: 'user',
      breadcrumb: 'breadcrumb.user'
    }
  },
  {
    path: 'user/detail/:mode', component: CrudDetailComponent, canActivate: [AuthGuard, ResourceAuthGuard], canDeactivate: [DirtyGuard],
    resolve: { record: RecordResolver },
    data: {
      program: 'user',
      breadcrumb: 'breadcrumb.user.detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
