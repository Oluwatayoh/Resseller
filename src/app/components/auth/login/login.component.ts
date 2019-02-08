import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { CustomersService } from '../../views/services/customers.service';
import { SystemModuleService } from '../../views/public-script/system-module.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit, OnDestroy {
	signForm: FormGroup;
	constructor(
		private _router: Router,
		private _customerService: CustomersService,
		private _systemModuleService: SystemModuleService,
		private _locker: CoolLocalStorage,
		private _formBuilder: FormBuilder
	) {}

	ngOnInit() {
		const body = document.getElementsByTagName('body')[0];
		body.classList.add('login-page');
		this.signForm = this._formBuilder.group({
			email: [ '', [ <any>Validators.required ] ],
			password: [ '', [ <any>Validators.required ] ]
		});
	}

	ngOnDestroy() {
		const body = document.getElementsByTagName('body')[0];
		body.classList.remove('login-page');
	}

	signUp() {
		this._router.navigate([ '/auth/register' ]).then((pay) => {});
	}


	signIn() {
		this._systemModuleService.on();
		const email = this.signForm.controls['email'].value;
		const password = this.signForm.controls['password'].value;
		this._customerService.loginCustomer(email, password).subscribe(
			(payload: any) => {
				this._systemModuleService.announceSweetProxy(
					`Welcome back ${payload.surname} ${payload.otherNames}`,
					'success',
					null,
					null,
					null,
					null,
					null,
					null,
					null
				);
				this._customerService.selectCustomer(payload);
				this._locker.setObject('selectedCustomer', payload);
				this._router.navigate([ '/views' ]).then((pay) => {
					this._systemModuleService.off();
				});
			},
			(error) => {
				this._systemModuleService.off();
				this._systemModuleService.announceSweetProxy(
					`Invalid username or password`,
					'error',
					null,
					null,
					null,
					null,
					null,
					null,
					null
				);
			}
		);
	}
}
