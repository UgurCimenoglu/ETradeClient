import { Inject, Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { HubUrls } from 'src/app/constants/hub-urls';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor(@Inject('baseSignalRUrl') private baseSignalRUrl: string) {}

  private _connection: HubConnection;
  get connection(): HubConnection {
    console.log('atama yapıldı');
    return this._connection;
  }

  start(hubUrl: string) {
    hubUrl = this.baseSignalRUrl + hubUrl;
    const builder: HubConnectionBuilder = new HubConnectionBuilder();
    const connection: HubConnection = builder
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log('Connected SignalR');
        this._connection = connection;
      })
      .catch(() => {
        setTimeout(() => {
          this.start(hubUrl);
        }, 2000);
      });

    return connection;
  }

  invoke(
    procedureName: string,
    message: any,
    successCallback?: (value) => void,
    errorCallback?: (error) => {}
  ) {
    this.connection
      .invoke(procedureName, message)
      .then(successCallback)
      .catch(errorCallback);
  }

  on(
    hubUrl: HubUrls,
    procedureName: string,
    callback: (...message: any) => void
  ) {
    this.start(hubUrl).on(procedureName, callback);
  }
}
