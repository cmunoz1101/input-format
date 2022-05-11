import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomLayoutComponent, NotFoundComponent } from '@xdf/layouts';
import { AuthGuard, LoginComponent } from '@xdf/security';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  // Remover para SSO
  { path: 'login', component: LoginComponent },
  // Main redirect
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard] },
  {
    path: '', component: CustomLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
      {
        path: 'security', data: { breadcrumb: 'Seguridad' }, canLoad: [AuthGuard],
        loadChildren: () => import('./modules/security/security.module').then(m => m.SecurityModule)
      },
      {
        path: 'settings', data: { breadcrumb: 'Ajustes Generales' }, canLoad: [AuthGuard],
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'input-configuration', data: { breadcrumb: 'Configuración de insumos' }, canLoad: [AuthGuard],
        loadChildren: () => import('./modules/input-configuration/input-configuration.module').then(m => m.InputConfigurationModule)
      },{
        path: 'etl_configuration', canLoad: [AuthGuard],
        loadChildren: () => import('./modules/etl-configuration/etl-configuration.module').then(m => m.EtlConfigurationModule)
      }
    ],
    canActivate: [AuthGuard]
  },
  { path: 'notpermitted', component: NotFoundComponent},

  // Handle all other routes
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'ignore'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
