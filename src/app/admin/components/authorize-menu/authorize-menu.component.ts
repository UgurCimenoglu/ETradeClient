import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from '@angular/material/tree';
import { AuthorizeMenuDialogComponent } from 'src/app/dialogs/authorize-menu-dialog/authorize-menu-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ApplicationService } from 'src/app/services/common/models/application.service';

interface ITreeMenu {
  name?: string;
  actions?: ITreeMenu[];
  code?: string;
  menuName?: string;
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrls: ['./authorize-menu.component.scss'],
})
export class AuthorizeMenuComponent implements OnInit {
  private _transformer = (menu: ITreeMenu, level: number) => {
    return {
      expandable: menu.actions?.length > 0,
      name: menu.name,
      level: level,
      code: menu.code,
      menuName: menu.menuName,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.actions
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(
    private applicationService: ApplicationService,
    private dialogService: DialogService
  ) {}
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  async ngOnInit() {
    this.dataSource.data = (
      await this.applicationService.getAuthorizeDefinitionEndpoints()
    ).map((m) => {
      const treeMenu: ITreeMenu = {
        name: m.name,
        actions: m.actions.map((a) => {
          const _treeMenu: ITreeMenu = {
            name: a.definition,
            code: a.code,
            menuName: m.name,
          };
          return _treeMenu;
        }),
      };
      console.log('cc', treeMenu);
      return treeMenu;
    });
  }

  assignRole(code: string, name: string, menuName: string) {
    console.log(code, name, menuName);
    this.dialogService.openDialog({
      componentType: AuthorizeMenuDialogComponent,
      data: { code, name, menuName },
    });
  }
}
