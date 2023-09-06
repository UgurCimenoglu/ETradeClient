import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { UiModule } from './ui/ui.module';
import { AdminModule } from './admin/admin.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './ui/components/login/login.component';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login/socialauth.service';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';

@NgModule({
  declarations: [AppComponent, LoginComponent, DynamicLoadComponentDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    MatIconModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('accessToken'),
        allowedDomains: ['ecommerce-ugur.azurewebsites.net'],
      },
    }),
    SocialLoginModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: 'baseUrl', useValue: 'https://ecommerce-ugur.azurewebsites.net/api', multi: true },
    {
      provide: 'baseSignalRUrl',
      useValue: 'https://ecommerce-ugur.azurewebsites.net/',
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '973727059764-9gnmv16gev7nit8bgh06oopcgmnq0f22.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('938154687551202'),
          },
        ],
        onError: (err) => console.log(err),
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptorService,
      multi: true,
    }, //http error intertceptoru projeye tanımlıyoruz.
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
