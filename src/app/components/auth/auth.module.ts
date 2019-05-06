import { ShareModule } from './../../helpers/share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EqualValidator } from '../views/public-script/equal-validator.directive';

@NgModule({
	imports: [ CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule, ShareModule ],
	declarations: [ AuthComponent, RegisterComponent, ForgotPasswordComponent, LoginComponent ],
	providers: []
})
export class AuthModule {}
