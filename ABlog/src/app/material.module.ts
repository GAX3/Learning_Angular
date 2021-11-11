import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule} from "@angular/material/card";
import { MatButtonModule} from "@angular/material/button";
import { MatMenuModule} from "@angular/material/menu";
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatIconModule} from "@angular/material/icon";
import { MatSidenavModule} from "@angular/material/sidenav";
import { MatListModule} from "@angular/material/list";

import { RouterModule} from "@angular/router";
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule} from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatFormFieldControl } from '@angular/material/form-field';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';


const myModule = [
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatChipsModule,
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatSelectModule,
  
]

@NgModule({
  declarations: [

  ],
  imports: [CommonModule, myModule, RouterModule],
  exports: [myModule,]
})
export class MaterialModule { }
