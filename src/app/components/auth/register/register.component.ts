import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicScriptLoaderService } from '../../views/public-script/dynamic-script-loader-service';
import { Router } from '@angular/router';
import { CustomersService } from '../../views/services/customers.service';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { SystemModuleService } from '../../views/public-script/system-module.service';
import { EMAIL_REGEX, PHONE_REGEX } from '../../views/public-script/global-config';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit, OnDestroy {
	customer: any = <any>{};
	customerForm: FormGroup;
	constructor(
		private _dynamicScriptLoader: DynamicScriptLoaderService,
		private _router: Router,
		private _formBuilder: FormBuilder,
		private _customerService: CustomersService,
		private _locker: CoolLocalStorage,
		private _systemModuleService: SystemModuleService
	) {}

	ngOnInit() {
		const body = document.getElementsByTagName('body')[0];
		body.classList.add('signup-page');
		this.customerForm = this._formBuilder.group({
			surname: [ '', [ <any>Validators.required, Validators.minLength(3) ] ],
			otherNames: [ '', [ <any>Validators.required, Validators.minLength(3) ] ],
			email: [ '', Validators.compose([ Validators.required, Validators.pattern(EMAIL_REGEX) ]) ],
			telephone: [ '', Validators.compose([ Validators.required, Validators.pattern(PHONE_REGEX) ]) ],
			password: [ '', [ <any>Validators.required ] ],
			confirmPassword: [ '', [ <any>Validators.required ] ],
			accept: [ false, [ <any>Validators.required ] ]
		});
	}

	signUp() {
		if (this.customerForm.controls['password'].value === this.customerForm.controls['confirmPassword'].value) {
			this._customerService.postCustomer(this.customerForm.value).subscribe(
				(payload) => {
					this._systemModuleService.announceSweetProxy(
						'Customer created successfully',
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
					this._router.navigate([ '/views/home' ]).then((pay) => {});
				},
				(error) => {
					this._systemModuleService.announceSweetProxy(
						'An error occured while creating customer',
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
		} else {
			this._systemModuleService.announceSweetProxy(
				`Password and ConfirmPassword must be equal`,
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
	}

	signIn() {
		this._router.navigate([ '/auth/login' ]).then((pay) => {});
	}

	isValid() {
		if (!!this.customer.surname || !!this.customer.otherNames || !!this.customer.email) {
			return false;
		}
		return this.customer.surname.length > 3;
	}

	ngOnDestroy() {
		const body = document.getElementsByTagName('body')[0];
		body.classList.remove('signup-page');
	}
}
