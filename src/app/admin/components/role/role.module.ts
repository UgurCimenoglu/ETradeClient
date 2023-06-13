import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';

@NgModule({
  declarations: [RoleComponent, CreateComponent, ListComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    DeleteDirectiveModule,
    RouterModule.forChild([{ path: '', component: RoleComponent }]),
  ],
})
export class RoleModule {}
