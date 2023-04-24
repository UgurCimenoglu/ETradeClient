import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectProductImageDialogComponent } from '../select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { FormsModule } from '@angular/forms';
import { BasketItemRemoveDialogComponent } from '../basket-item-remove-dialog/basket-item-remove-dialog.component';
import { BasketComplatedDialogComponent } from '../basket-complated-dialog/basket-complated-dialog.component';
import { OrderDetailDialogComponent } from '../order-detail-dialog/order-detail-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { CompleteOrderDialogComponent } from '../complete-order-dialog/complete-order-dialog.component';
import { AuthorizeMenuDialogComponent } from '../authorize-menu-dialog/authorize-menu-dialog.component';
import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
    BasketItemRemoveDialogComponent,
    BasketComplatedDialogComponent,
    OrderDetailDialogComponent,
    CompleteOrderDialogComponent,
    AuthorizeMenuDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    FileUploadModule,
    FormsModule,
    MatTableModule,
    MatBadgeModule
  ],
})
export class DialogModule {}
