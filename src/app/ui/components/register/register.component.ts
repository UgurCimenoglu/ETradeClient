import { Create_User } from './../../../contracts/users/create_user';
import { UserService } from './../../../services/common/models/user.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/entities/user';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toast: CustomToastrService
  ) {}

  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group(
      {
        fullname: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.maxLength(100), Validators.email],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        passwordConfirm: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
      },
      {
        validators: (group: AbstractControl): ValidationErrors | null => {
          const password = group.get('password').value;
          const passwordConfirm = group.get('passwordConfirm').value;
          return password === passwordConfirm ? null : { notSame: true };
        },
      }
    );
  }

  submitted = false;
  onSubmit = async (user: User) => {
    this.submitted = true;
    if (this.frm.valid) {
      const result: Create_User = await this.userService.create(user);
      if (result.succeeded) {
        this.toast.message(result.message, 'Kullanıcı Kaydı Başarılı', {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        });
      } else {
        this.toast.message(result.message, 'Hatalı Kullanıcı Kayıt İşlemi!', {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        });
      }
    }
  };

  get component() {
    return this.frm.controls;
  }

  validationMessages = {
    fullname: {
      required: 'Ad-Soyad Zorunludur!',
      minlength: 'Ad-Soyad 3 Karakterden Küçük Olamaz!',
      maxlength: 'Ad-Soyad 50 Karakterden Büyük Olamaz!',
    },
    username: {
      required: 'Kullanıcı Adı Zorunludur!',
      minlength: 'Kullanıcı Adı 3 Karakterden Küçük Olamaz!',
      maxlength: 'Kullanıcı Adı 50 Karakterden Büyük Olamaz!',
    },
    email: {
      required: 'Email Zorunludur!',
      maxlength: 'Email 100 Karakterden Büyük Olamaz!',
      email: 'Lütfen Email Formatında Bir Giriş Yapınız!',
    },
    password: {
      required: 'Şifre Zorunludur!',
      minlength: 'Şifre 3 Karakterden Küçük Olamaz!',
      maxlength: 'Şifre 50 Karakterden Büyük Olamaz!',
    },
    passwordConfirm: {
      required: 'Şifre Tekrarı Zorunludur!',
      minlength: 'Şifre Tekrarı 3 Karakterden Küçük Olamaz!',
      maxlength: 'Şifre Tekrarı 50 Karakterden Büyük Olamaz!',
      notSame: 'Şifreler Uyuşmuyor!',
    },
  };
}
