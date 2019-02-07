import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerBandwidthTransactionsService } from '../services/customer-bandwidth-transactions.service';

@Component({
	selector: 'app-bandwidth',
	templateUrl: './bandwidth.component.html',
	styleUrls: [ './bandwidth.component.scss' ]
})
export class BandwidthComponent implements OnInit {
	customer;
	bandWidthTransactions = [];
	constructor(
		private _locker: CoolLocalStorage,
		private _customerTransactionService: CustomerBandwidthTransactionsService,
		private _formBuilder: FormBuilder,
		private _router: Router
	) {}

	ngOnInit() {
		this.customer = this._locker.getObject('selectedCustomer');
		this.getBandWidthTransations();
	}

	getBandWidthTransations() {
		this._customerTransactionService.getCustomerBandWidthTransactions(this.customer.id, true).subscribe(
			(payload: any) => {
				this.bandWidthTransactions = payload;
			},
			(error) => {
				console.log(error);
			}
		);
	}
}
