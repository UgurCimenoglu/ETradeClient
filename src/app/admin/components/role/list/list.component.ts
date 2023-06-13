import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/product_list';
import { List_Role } from 'src/app/contracts/roles/list_role';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private roleService: RoleService,
    private spinnerService: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ) {
    super(spinnerService);
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'edit', 'delete'];
  dataSource: MatTableDataSource<List_Role> = null;
  async ngOnInit() {
    await this.getRoles();
  }
  addProductImages(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
    });
  }
  async pageChanged() {
    await this.getRoles();
  }
  async getRoles() {
    this.showSpinner(SpinnerType.BallSpinClockwise);
    const allRoles = await this.roleService.getRoles(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => {
        this.hideSpinner(SpinnerType.BallSpinClockwise);
      },
      (errorMessage: string) => {
        this.alertifyService.message(errorMessage, {
          messageType: MessageType.Error,
          position: Position.TopRight,
        });
      }
    );
    this.dataSource = new MatTableDataSource<List_Role>(allRoles.datas);
    this.paginator.length = allRoles.totalCount;
  }
  delete(id: number, event: MouseEvent) {
    console.log(id);
    console.log(event);
  }
}
