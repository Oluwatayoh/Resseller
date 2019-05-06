import { CityService } from './../../views/services/city.service';
import { UploadScriptService } from './../../views/services/upload-script.service';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicScriptLoaderService } from '../../views/public-script/dynamic-script-loader-service';
import { Router } from '@angular/router';
import { ResellersService } from '../../views/services/resellers.service';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { SystemModuleService } from '../../views/public-script/system-module.service';
import { EMAIL_REGEX, PHONE_REGEX } from '../../views/public-script/global-config';
import { HttpEventType } from '@angular/common/http';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit, OnDestroy {
	reseller: any = <any>{};
	resellerForm: FormGroup;
	cities = [];
	@ViewChild('file') file: ElementRef;
	constructor(
		private _dynamicScriptLoader: DynamicScriptLoaderService,
		private _router: Router,
		private _formBuilder: FormBuilder,
		private _resellerService: ResellersService,
		private _locker: CoolLocalStorage,
		private _systemModuleService: SystemModuleService,
		private _uploadService: UploadScriptService,
		private _cityService: CityService
	) {}

	ngOnInit() {
		const body = document.getElementsByTagName('body')[0];
		body.classList.add('signup-page');
		this.resellerForm = this._formBuilder.group({
			companyName: [ '', [ <any>Validators.required, Validators.minLength(3) ] ],
			contactPerson: [ '', [ <any>Validators.required, Validators.minLength(3) ] ],
			email: [ '', Validators.compose([ Validators.required, Validators.pattern(EMAIL_REGEX) ]) ],
			address: [ '', Validators.compose([ Validators.required, Validators.minLength(3) ]) ],
			telephone: [ '', Validators.compose([ Validators.required, Validators.pattern(PHONE_REGEX) ]) ],
			numberOfYearOfExperience: [ 0, Validators.compose([ Validators.required ]) ],
			rrrCode: [ '', Validators.compose([ Validators.required ]) ],
			uploadFileName: [ '', [] ],
			password: [ '', [ <any>Validators.required ] ],
			confirmPassword: [ '', [ <any>Validators.required ] ],
			cityId: [ '', [ <any>Validators.required ] ],
			accept: [ false, [ <any>Validators.required ] ]
		});
		this.getCities();
	}
	getCities() {
		this._cityService.get().subscribe(
			(payload) => {
				this.cities = payload;
			},
			(error) => {}
		);
	}
	upload2() {
		const formData = new FormData();
		const fi = this.file.nativeElement;
		if (fi.files && fi.files[0]) {
			const fileToUpload = fi.files[0];
			formData.append(fileToUpload.name, fileToUpload);
			return formData;
		}
	}

	isFileSelected() {
		const fi = this.file.nativeElement;
		return fi.files.length > 0;
	}

	signUp() {
		if (this.resellerForm.controls['password'].value === this.resellerForm.controls['confirmPassword'].value) {
			const fi = this.file.nativeElement;
			if (fi.files && fi.files[0]) {
				const fileToUpload = fi.files[0];
				this.resellerForm.value.uploadFileName = fileToUpload.name;
			}
			this._resellerService.postReseller(this.resellerForm.value).subscribe(
				(payload: any) => {
					const formData = this.upload2();
					const entityId = payload.id;
					const recordType = 'ISP';
					this._uploadService.postRecord(entityId, recordType, formData).subscribe(
						(event: any) => {
							if (event.type === HttpEventType.UploadProgress) {
							} else if (event.type === HttpEventType.Response) {
								if (event.status === 200) {
									this._systemModuleService.announceSweetProxy(
										'Reseller created successfully',
										'success',
										null,
										null,
										null,
										null,
										null,
										null,
										null
									);
									payload.uploadFileName = event.body.fileName;
									this._resellerService.selectReseller(payload);
									this._locker.setObject('selectedReseller', payload);
									this._locker.setObject('cart', []);
									this._router.navigate([ '/views/home' ]).then((pay) => {});
								} else {
								}
							}
						},
						(error2) => {}
					);
				},
				(error) => {
					this._systemModuleService.announceSweetProxy(
						'An error occured while creating reseller',
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
		if (!!this.reseller.surname || !!this.reseller.otherNames || !!this.reseller.email) {
			return false;
		}
		return this.reseller.surname.length > 3;
	}

	ngOnDestroy() {
		const body = document.getElementsByTagName('body')[0];
		body.classList.remove('signup-page');
	}
}
