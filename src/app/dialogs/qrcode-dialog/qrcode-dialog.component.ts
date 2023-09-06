import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { QrCodeServiceService } from 'src/app/services/common/qr-code-service.service';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrls: ['./qrcode-dialog.component.scss'],
})
export class QrcodeDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public productId: string,
    private qrCodeCodeService: QrCodeServiceService,
    private domSatinizer: DomSanitizer,
    private spinner: NgxSpinnerService
  ) {}

  qrCodeSafeUrl: SafeUrl;

  async ngOnInit() {
    this.spinner.show(SpinnerType.SquareJellyBox);
    const qrCodeblob = await this.qrCodeCodeService.generateQRCode(
      this.productId
    );
    const url = URL.createObjectURL(qrCodeblob);
    this.qrCodeSafeUrl = this.domSatinizer.bypassSecurityTrustUrl(url);
    this.spinner.hide(SpinnerType.SquareJellyBox);
  }
}
