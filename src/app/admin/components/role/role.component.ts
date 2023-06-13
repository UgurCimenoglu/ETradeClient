import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {}

  @ViewChild(ListComponent) listComponents: ListComponent;

  createdRole() {
    this.listComponents.getRoles();
  }
}
