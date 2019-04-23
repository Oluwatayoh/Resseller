import { Component, OnInit } from '@angular/core';
import { Config } from '../../../../classes/config';
import { Router } from '@angular/router';
import { DynamicScriptLoaderService } from '../../public-script/dynamic-script-loader-service';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { CustomersService } from '../../services/customers.service';
import { ONLINEPATH } from '../../public-script/global-config';
import { BroadcastImageUploadService } from '../../public-script/broadcast-image-upload.service';

@Component({
	selector: 'app-navbar-left',
	templateUrl: './navbar-left.component.html',
	styleUrls: [ './navbar-left.component.scss' ]
})
export class NavbarLeftComponent implements OnInit {
	appInfo: any = Config.APP;
	customer;
	baseUrl = `${ONLINEPATH}`;
	selectedTheme = 'Red';
	constructor(
		private _dynamicScriptLoader: DynamicScriptLoaderService,
		private _router: Router,
		private _locker: CoolLocalStorage,
		private _customerService: CustomersService,
		private _imageUploadBroadCastUploadService: BroadcastImageUploadService
	) {
		this._customerService.customerSelected.subscribe((value) => {
			this.customer = value;
		});

		_imageUploadBroadCastUploadService.imageUpdateAnnounced$.subscribe((value) => {
			this.ngOnInit();
		});
	}

	ngOnInit() {
		this.customer = this._locker.getObject('selectedCustomer');
	}

	private loadScripts() {
		// You can load multiple scripts by just providing the key as argument into load method of the service

		this._dynamicScriptLoader
			.load(
				'jquery',
				'bootstrap',
				'bootstrap-select',
				'jquery-slimscroll',
				'waves',
				'jquery-countto',
				'raphael',
				'morries',
				'chartjs',
				'jquery-flot',
				'jquery-flot-resize',
				'jquery-flot-pie',
				'jquery-flot-categories',
				'jquery-flot-time',
				'jquery-sparkline',
				'admin',
				'index',
				'demo'
			)
			.then((data) => {
				// Script Loaded Successfully
			})
			.catch((error) => console.log(error));
	}

	signOut() {
		this._router.navigate([ '/auth' ]).then(
			(result) => {
				this._locker.setObject('cart', []);
				this._locker.clear();
			},
			(error) => {
				console.log(error);
			}
		);
	}

	setTheme(color) {
		this.selectedTheme = color;
	}
}
