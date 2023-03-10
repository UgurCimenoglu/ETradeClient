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
        this.toast.message(result.message, 'Kullan??c?? Kayd?? Ba??ar??l??', {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight,
        });
      } else {
        this.toast.message(result.message, 'Hatal?? Kullan??c?? Kay??t ????lemi!', {
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
      minlength: 'Ad-Soyad 3 Karakterden K??????k Olamaz!',
      maxlength: 'Ad-Soyad 50 Karakterden B??y??k Olamaz!',
    },
    username: {
      required: 'Kullan??c?? Ad?? Zorunludur!',
      minlength: 'Kullan??c?? Ad?? 3 Karakterden K??????k Olamaz!',
      maxlength: 'Kullan??c?? Ad?? 50 Karakterden B??y??k Olamaz!',
    },
    email: {
      required: 'Email Zorunludur!',
      maxlength: 'Email 100 Karakterden B??y??k Olamaz!',
      email: 'L??tfen Email Format??nda Bir Giri?? Yap??n??z!',
    },
    password: {
      required: '??ifre Zorunludur!',
      minlength: '??ifre 3 Karakterden K??????k Olamaz!',
      maxlength: '??ifre 50 Karakterden B??y??k Olamaz!',
    },
    passwordConfirm: {
      required: '??ifre Tekrar?? Zorunludur!',
      minlength: '??ifre Tekrar?? 3 Karakterden K??????k Olamaz!',
      maxlength: '??ifre Tekrar?? 50 Karakterden B??y??k Olamaz!',
      notSame: '??ifreler Uyu??muyor!',
    },
  };
}
