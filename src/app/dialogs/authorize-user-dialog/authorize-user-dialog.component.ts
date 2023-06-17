import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { List_Role } from 'src/app/contracts/roles/list_role';
import { AuthorizationEndpointService } from 'src/app/services/common/models/authorization-endpoint.service';
import { RoleService } from 'src/app/services/common/models/role.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.scss'],
})
export class AuthorizeUserDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: string | any,
    private roleService: RoleService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {
    console.log(data);
  }

  async ngOnInit() {
    console.log('xx', this.data);
    this.spinner.show(SpinnerType.BallSpinClockwise);
    this.roles = await this.roleService.getRoles(
      -1,
      -1,
      () => {},
      () => {}
    );
    await this.userService.getRolesToUser(this.data).then((result) => {
      this.assignedRoles = result.roles;
    });
    this.spinner.hide(SpinnerType.BallSpinClockwise);
  }

  roles: { datas: List_Role[]; totalCount: number } = null;
  selectedRoles: string[];
  assignedRoles: string[] | null;

  setSelectedRoles(options: any) {
    var a = options.map((o) => o.value.name);
    this.selectedRoles = a;
  }

  assignRoles() {
    this.spinner.show(SpinnerType.BallSpinClockwise);
    this.userService.assignRoleToUser(
      this.data,
      this.selectedRoles,
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
