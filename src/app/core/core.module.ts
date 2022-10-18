import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ErrorComponent } from './components/error/error.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    ErrorComponent,
    RegistrationComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
