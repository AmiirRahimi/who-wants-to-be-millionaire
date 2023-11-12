import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children:[
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'private',
        loadChildren: () => import('./private/private.module').then((m) => m.PrivateModule),
        canActivate:[AuthGuard]
      },
      {
        path: '',
        loadChildren: () => import('./public/public.module').then((m) => m.PublicModule)
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
