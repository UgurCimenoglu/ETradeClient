import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { SignalRService } from 'src/app/services/common/signalr.service';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { RecieveFunctions } from 'src/app/constants/recieve-functions';
import { HubUrls } from 'src/app/constants/hub-urls';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(
    private alertifyService: AlertifyService,
    spinner: NgxSpinnerService,
    private signalRService: SignalRService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.signalRService.on(
      HubUrls.ProductHub,
      RecieveFunctions.ProductAddedMessageRecieveFunction,
      (message) => {
        this.alertifyService.message(message, {
          messageType: MessageType.Notify,
          position: Position.TopRight,
        });
      }
    );
    this.signalRService.on(
      HubUrls.OrderHub,
      RecieveFunctions.OrderAddedMessageRecieverFunction,
      (message) => {
        this.alertifyService.message(message, {
          messageType: MessageType.Notify,
          position: Position.TopRight,
        });
      }
    );
  }
}
