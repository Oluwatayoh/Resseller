import { FormControl } from '@angular/forms';
import { DataplanService } from './../../../services/dataplan.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../../services/device.service';
import { BroadcastShoppingCartService } from '../../../public-script/broadcast-shopping-cart.service';
import { CustomerDeviceTransactionsService } from '../../../services/customer-device-transactions.service';
import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
	selector: 'app-bandwidth-details',
	templateUrl: './bandwidth-details.component.html',
	styleUrls: [ './bandwidth-details.component.scss' ]
})
export class BandwidthDetailsComponent implements OnInit {
	sub: Subscription;
	id = 0;
	selectedProduct: any;
	deviceTransactions = [];
	quantity = 1;
	customer: any;
	selectedDevice: FormControl = new FormControl();
	constructor(
		private _locker: CoolLocalStorage,
		private _activatedRoute: ActivatedRoute,
		private _dataPlanService: DataplanService,
		private _broadCastShopping: BroadcastShoppingCartService,
		private _customerTransactionService: CustomerDeviceTransactionsService,
		private _router: Router
	) {}

	ngOnInit() {
		this.customer = this._locker.getObject('selectedCustomer');
		this.sub = this._activatedRoute.params.subscribe((params) => {
			this.id = params['id'];
			this._dataPlanService.getDataPlan(this.id).subscribe(
				(payload) => {
					this.selectedProduct = payload;
				},
				(error) => {
					console.log(error);
				}
			);
		});
		this.getDeviceTransations();
		this.selectedDevice.valueChanges.subscribe((value) => {});
	}
	addToCart() {
		this._broadCastShopping.announceCartOperation({
			product: this.selectedProduct,
			device: this.selectedDevice.value,
			quantity: this.quantity,
			operation: 'add',
			checked: false
		});
		this._router.navigate([ '/views/product-list' ]);
	}

	getDeviceTransations() {
		this._customerTransactionService.getCustomerDeviceTransactions(this.customer.id, true).subscribe(
			(payload: any) => {
				this.deviceTransactions = payload;
			},
			(error) => {
				console.log(error);
			}
		);
	}
}
