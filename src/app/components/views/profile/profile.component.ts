import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ResellersService } from '../services/resellers.service';
import { SystemModuleService } from '../public-script/system-module.service';
import { ONLINE, ONLINEPATH } from '../public-script/global-config';
import { BroadcastImageUploadService } from '../public-script/broadcast-image-upload.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.scss' ]
})
export class ProfileComponent implements OnInit {
	editFields = false;
	doneEdit = true;
	changePassword = false;
	donePasswordChange = true;
	reseller;
	resellerForm: FormGroup;
	currentPassword: FormControl = new FormControl('');
	password: FormControl = new FormControl('');
	confirmPassword: FormControl = new FormControl('');
	baseUrl = `${ONLINEPATH}`;
	constructor(
		private _locker: CoolLocalStorage,
		private _resellerService: ResellersService,
		private _formBuilder: FormBuilder,
		private _systemModuleService: SystemModuleService,
		private _imageUploadBroadCastUploadService: BroadcastImageUploadService,
		private _router: Router,
		private cdRef: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.reseller = this._locker.getObject('selectedReseller');
		this.resellerForm = this._formBuilder.group({
			companyName: [ this.reseller.companyName, [ <any>Validators.required, Validators.minLength(3) ] ],
			contactPerson: [ this.reseller.contactPerson, [ <any>Validators.required ] ],
			email: [ this.reseller.email, [ <any>Validators.required ] ],
			telephone: [ this.reseller.telephone, [ <any>Validators.required ] ],
			profession: [ this.reseller.profession, [ <any>Validators.required ] ],
			address: [ this.reseller.address, [ <any>Validators.required ] ]
		});
	}

	onEditField() {
		this.editFields = true;
		this.doneEdit = false;
	}

	onDoneEdit() {
		const _reseller = this.resellerForm.value;
		this.reseller.surname = _reseller.surname;
		this.reseller.otherNames = _reseller.otherNames;
		this.reseller.telephone = _reseller.telephone;
		this.reseller.profession = _reseller.profession;
		this.reseller.address = _reseller.address;
		this._resellerService.putReseller(this.reseller).subscribe(
			(payload) => {
				this.editFields = false;
				this.doneEdit = true;
				this._systemModuleService.announceSweetProxy(
					`You have successfully updated your profile`,
					'success',
					null,
					null,
					null,
					null,
					null,
					null,
					null
				);
			},
			(error) => {
				this._systemModuleService.announceSweetProxy(
					`An error has occured while updating your profile`,
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

	completeOperation(value) {
		if (!!value) {
			this._locker.setObject('selectedReseller', value);
			this.cdRef.detectChanges();
			this.ngOnInit();
			this._imageUploadBroadCastUploadService.announceLoading(value);
		}
	}
	getRealTimeImageUrl() {
		// {{baseUrl}}{{reseller.fileName}}{{getTime()}}
		const url = this.baseUrl + this.reseller.fileName;
		// return (url += '?random+=' + Math.random());
		return url;
	}

	onChangePassword() {
		this.changePassword = true;
		this.donePasswordChange = false;
	}
	sing_out() {
		this._locker.clear();
		this._router.navigate([ '/auth/login' ]);
	}
	onDonePasswordChange() {
		if (this.password.value === this.confirmPassword.value) {
			this._resellerService
				.putResellerPassword(this.reseller.id, this.currentPassword.value, this.password.value, this.reseller)
				.subscribe(
					(payload) => {
						this._systemModuleService.announceSweetProxy(
							`You have successfully changed your password`,
							'success',
							null,
							null,
							null,
							null,
							null,
							null,
							null
						);

						this.changePassword = false;
						this.donePasswordChange = true;
						this.sing_out();
					},
					(error) => {
						this._systemModuleService.announceSweetProxy(
							`An error has occured while changing your password`,
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
	cancel() {
		this.changePassword = false;
		this.donePasswordChange = true;
	}
	cancelEdit() {
		this.editFields = false;
		this.doneEdit = true;
	}
}
