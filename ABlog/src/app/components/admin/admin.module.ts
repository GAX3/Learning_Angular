import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from 'src/app/material.module';
import { MatFormFieldControl } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AdminComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    
    
  ]
})
export class AdminModule { }
