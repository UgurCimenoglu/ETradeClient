import { Component } from '@angular/core';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/ui/custom-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ETradeClient';

  constructor(private toastrService: CustomToastrService) {
    // this.toastrService.message('Merhaba', 'İlk Mesaj', {
    //   messageType: ToastrMessageType.Info,
    //   position: ToastrPosition.TopFullWidth,
    // });
    // this.toastrService.message('Merhaba', 'İkinci Mesaj', {
    //   messageType: ToastrMessageType.Error,
    //   position: ToastrPosition.BottomLeft,
    // });
  }
}
