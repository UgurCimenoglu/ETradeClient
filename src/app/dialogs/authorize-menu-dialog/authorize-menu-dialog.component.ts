import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List_Role } from 'src/app/contracts/roles/list_role';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss'],
})
export class AuthorizeMenuDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { code: string; name: string } | any,
    private roleService: RoleService
  ) {
    console.log(data);
  }

  async ngOnInit() {
    console.log(this.data);
    const datas = await this.roleService.getRoles(-1, -1);
    this.roles = datas;
  }

  roles: { datas: List_Role[]; totalCount: number } = null;
}
export enum AuthorizeMenuState {
  Yes = 1,
  No = 0,
}
