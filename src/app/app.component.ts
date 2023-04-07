import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { ComponentType } from '../app/services/common/dynamic-load-component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;

  constructor(
    public authService: AuthService,
    private dynamicLoadComponentService: DynamicLoadComponentService
  ) {
    authService.identityCheck();
  }

  signOut() {
    this.authService.signOut();
  }

  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketComponent,this.dynamicLoadComponentDirective.viewContainerRef);
  }
}
