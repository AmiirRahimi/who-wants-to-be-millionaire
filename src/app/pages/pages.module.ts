import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { PrivateComponent } from './private/private.component';
import { PublicComponent } from './public/public.component';

@NgModule({
  declarations: [
    PagesComponent,
    PrivateComponent,
    PublicComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
