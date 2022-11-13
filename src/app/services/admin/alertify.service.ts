import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  message(message: string, options: Partial<AlertifyOptions>) {
    alertify.set('notifier', 'position', options.position);
    alertify.set('notifier', 'delay', options.delay);
    const msj = alertify[options.messageType](message);
    if (options.dismissOthers) msj.dismissOthers();
  }

  dismiss() {
    alertify.dismiss();
  }
}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position: Position = Position.TopLeft;
  delay: number = 3;
  dismissOthers: boolean = false;
}

export enum MessageType {
  Error = 'error',
  Message = 'message',
  Success = 'success',
  Notify = 'notify',
  Warning = 'warning',
}

export enum Position {
  TopCenter = 'top-center',
  TopLeft = 'top-left',
  TopRight = 'top-right',
  BottomCenter = 'bottom-center',
  BottomRight = 'bottom-right',
  BottomLeft = 'bottom-left',
}
