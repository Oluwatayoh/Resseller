import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PAYSTACK_CLIENT_KEY } from '../public-script/global-config';
import { CustomerDeviceTransactionsService } from '../services/customer-device-transactions.service';
import { DeviceService } from '../services/device.service';
import { PaystackVerificationService } from '../services/paystack-verification.service';
import { SystemModuleService } from '../public-script/system-module.service';
import { PaymentModeService } from '../services/payment-mode.service';

@Component({
	selector: 'app-device',
	templateUrl: './device.component.html',
	styleUrls: [ './device.component.scss' ]
})
export class DeviceComponent implements OnInit {
	// selBankTransfer = false;
	@ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
	customer;
	deviceTransactions = [];
	paymentModes = [];
	devices = [];
	paystackClientKey: string = PAYSTACK_CLIENT_KEY;
	refKey: string;
	selectedDevice: any;
	paymentMode: FormControl = new FormControl();
	hideOnlinePayment = true;
	constructor(
		private _locker: CoolLocalStorage,
		private _customerTransactionService: CustomerDeviceTransactionsService,
		private _deviceService: DeviceService,
		private _formBuilder: FormBuilder,
		private _payStackVerificationService: PaystackVerificationService,
		private _systemModuleService: SystemModuleService,
		private _paymentModeService: PaymentModeService,
		private _router: Router
	) {}

	ngOnInit() {
		this.customer = this._locker.getObject('selectedCustomer');
		this.refKey = (this.customer ? this.customer.id.toString() : '') + new Date().getTime();
		this.getDeviceTransations();
		this.getDevices();
		this.getPaymentModes();
		this.paymentMode.valueChanges.subscribe((value) => {
			console.log(value);
			if (value === 'Online Transfer') {
				this.hideOnlinePayment = false;
			} else {
				this.hideOnlinePayment = true;
			}
		});
	}

	getDeviceTransations() {
		this._customerTransactionService.getCustomerDeviceTransactions(this.customer.id, true).subscribe(
			(payload: any) => {
				this.deviceTransactions = payload;
				console.log(payload);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	getPaymentModes() {
		this._paymentModeService.getPaymentModes().subscribe(
			(payload: any) => {
				this.paymentModes = payload;
				console.log(payload);
				this.paymentMode.setValue('Online Transfer');
			},
			(error) => {
				console.log(error);
			}
		);
	}

	getDevices() {
		this._deviceService.getDevices().subscribe(
			(payload: any) => {
				this.devices = payload;
				console.log(payload);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	buyDevice(device) {
		this.selectedDevice = device;
	}

	paymentCancel() {
		this.refKey = (this.customer ? this.customer.id.toString() : '') + new Date().getTime();
	}
	paymentDone(paymentRes) {
		console.log(paymentRes);
		this.refKey = (this.customer ? this.customer.id.toString() : '') + new Date().getTime();

		const amount = parseFloat(this.selectedDevice.price);
		const walletTransaction: any = {
			payStackReponse: paymentRes,
			amount: amount,
			customerId: this.customer.id,
			deviceId: this.selectedDevice.id,
			transactionType: 'Device'
		};
		console.log(walletTransaction);

		this._payStackVerificationService.postPayStackVerification(walletTransaction).subscribe(
			(payload) => {
				this._systemModuleService.announceSweetProxy(
					`Successfully purchased ${this.selectedDevice.name}`,
					'success',
					null,
					null,
					null,
					null,
					null,
					null,
					null
				);
				this.closeAddExpenseModal.nativeElement.click();
				this.getDeviceTransations();
			},
			(error) => {
				this._systemModuleService.announceSweetProxy(
					`Transaction error occured while purchasing ${this.selectedDevice.name}`,
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

	// onshowBankTransfer(){this.selBankTransfer=true}
}
