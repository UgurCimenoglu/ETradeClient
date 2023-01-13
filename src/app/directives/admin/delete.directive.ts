import { DialogService } from './../../services/common/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService
  ) {
    const span = _renderer.createElement('i');
    //span.innerText'e verdiğimiz text ile aslında icon geliyor fakat icon text ile sağlanıyor burada delete yazdık çöp kutusu iconu
    //geldi book yazınca kitap geliyor bu bir alt satırda yazdıgımız material-icons classi ile sağlanıyor.
    span.innerText = 'delete';
    span.setAttribute('class', 'material-icons');
    span.setAttribute('style', 'cursor:pointer');
    _renderer.appendChild(element.nativeElement, span);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  async onClick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      beforeClosed: this.onDelete,
    });
  }

  onDelete = async () => {
    this.spinner.show(SpinnerType.BallSpinClockwise);
    const td: HTMLTableCellElement = this.element.nativeElement;
    await this.httpClientService
      .delete({ controller: this.controller }, this.id)
      .subscribe(
        (result) => {
          $(td.parentElement).fadeOut(300, () => {
            this.callback.emit();
            this.alertifyService.message('Ürün başarıyla silinmiştir.', {
              messageType: MessageType.Success,
              position: Position.TopRight,
            });
          });
        },
        (error: HttpErrorResponse) => {
          this.spinner.hide(SpinnerType.BallSpinClockwise);
          this.alertifyService.message('Beklenmeyen bir hata oluştu.', {
            messageType: MessageType.Error,
            position: Position.TopRight,
          });
        }
      );
  };
}
