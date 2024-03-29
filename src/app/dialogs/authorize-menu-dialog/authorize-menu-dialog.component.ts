import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { List_Role } from 'src/app/contracts/roles/list_role';
import { AuthorizationEndpointService } from 'src/app/services/common/models/authorization-endpoint.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss'],
})
export class AuthorizeMenuDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { code: string; name: string; menuName: string } | any,
    private roleService: RoleService,
    private authorizationEndpointService: AuthorizationEndpointService,
    private spinner: NgxSpinnerService
  ) {
    console.log(data);
  }

  async ngOnInit() {
    console.log('xx', this.data);
    this.roles = await this.roleService.getRoles(
      -1,
      -1,
      () => {},
      () => {}
    );
    await this.authorizationEndpointService
      .GetRolesToEndpoint(this.data.code, this.data.menuName)
      .then((result) => {
        this.assignedRoles = result.roles;
      });
  }

  roles: { datas: List_Role[]; totalCount: number } = null;
  selectedRoles: string[];
  assignedRoles: string[]|null;

  setSelectedRoles(options: any) {
    var a = options.map((o) => o.value.id);
    this.selectedRoles = a;
  }

  assignRoles() {
    console.log(this.data.menuName);
    this.spinner.show(SpinnerType.BallSpinClockwise);
    this.authorizationEndpointService.assignRoleEndpoint(
      this.selectedRoles,
      this.data.code,
      this.data.menuName,
      () => {},
      () => {}
    );
    this.spinner.hide(SpinnerType.BallSpinClockwise);
  }
}
export enum AuthorizeMenuState {
  Yes = 1,
  No = 0,
}
