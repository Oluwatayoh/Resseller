import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [ CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule ],
	declarations: [ AuthComponent, RegisterComponent, ForgotPasswordComponent, LoginComponent ],
	providers: []
})
export class AuthModule {}
