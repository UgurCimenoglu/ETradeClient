import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { QrCodeServiceService } from 'src/app/services/common/qr-code-service.service';

@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrls: ['./qrcode-reading-dialog.component.scss'],
})
export class QrcodeReadingDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public productId: string,
    private qrCodeCodeService: QrCodeServiceService,
    private domSatinizer: DomSanitizer,
    private spinner: NgxSpinnerService
  ) {}

  qrCodeSafeUrl: SafeUrl;

  async ngOnInit() {}
}
