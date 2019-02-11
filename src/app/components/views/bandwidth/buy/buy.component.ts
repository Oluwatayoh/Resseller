import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PAYSTACK_CLIENT_KEY } from '../../public-script/global-config';
import { DataplanService } from '../../services/dataplan.service';
import { CustomerBandwidthTransactionsService } from '../../services/customer-bandwidth-transactions.service';
import { PaystackVerificationService } from '../../services/paystack-verification.service';
import { SystemModuleService } from '../../public-script/system-module.service';
import { InvoiceService } from '../../services/invoice.service';

@Component({
	selector: 'app-buy',
	templateUrl: './buy.component.html',
	styleUrls: [ './buy.component.scss' ]
})
export class BuyComponent implements OnInit {
	@Output() reloadTransaction: EventEmitter<boolean> = new EventEmitter<boolean>();
	dataplans: any = [];
	customer;
	paystackClientKey: string = PAYSTACK_CLIENT_KEY;
	refKey: string;
	selectedPlan: any;
	paystackPayment = false;
	currentInvoice: any;
	constructor(
		private _locker: CoolLocalStorage,
		private _dataPlanService: DataplanService,
		private _customerTransactionService: CustomerBandwidthTransactionsService,
		private _formBuilder: FormBuilder,
		private _payStackVerificationService: PaystackVerificationService,
		private _systemModuleService: SystemModuleService,
		private _invoiceService: InvoiceService,
		private _router: Router
	) {}

	ngOnInit() {
		this.customer = this._locker.getObject('selectedCustomer');
		this.getDataPlanRecords();
		this.refKey = (this.customer ? this.customer.id.toString() : '') + new Date().getTime();
	}

	getDataPlanRecords() {
		this._dataPlanService.getDataPlans(true).subscribe(
			(payload: any) => {
				this.dataplans = payload;
			},
			(error) => {}
		);
	}

	buyDataPlan(plan) {
		this.currentInvoice = undefined;
		const invoice = {
			quantity: 1,
			item: plan.name,
			itemType: 'Data Plan',
			invoiceNumber: '',
			customerId: this.customer.id,
			productType: 'Data Plan',
			productId: plan.id,
			price: plan.price
		};
		this._invoiceService.postInvoice(invoice).subscribe(
			(payload: any) => {
				this.selectedPlan = plan;
				this.paystackPayment = true;
				this.currentInvoice = JSON.parse(payload);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	paymentCancel() {
		this.refKey = (this.customer ? this.customer.id.toString() : '') + new Date().getTime();
	}
	paymentDone(paymentRes) {
		if (this.currentInvoice === undefined) {
		} else {
			this.refKey = (this.customer ? this.customer.id.toString() : '') + new Date().getTime();

			const amount = parseFloat(this.selectedPlan.price);
			const walletTransaction: any = {
				payStackReponse: paymentRes,
				amount: amount,
				customerId: this.customer.id,
				dataPlanId: this.selectedPlan.id,
				transactionType: 'Data Plan',
				invoiceId: this.currentInvoice.id
			};

			this._payStackVerificationService.postPayStackVerification(walletTransaction).subscribe(
				(payload) => {
					this._systemModuleService.announceSweetProxy(
						`Successfully purchased ${this.selectedPlan.name}`,
						'success',
						null,
						null,
						null,
						null,
						null,
						null,
						null
					);
					this.reloadTransaction.emit(true);
				},
				(error) => {
					this._systemModuleService.announceSweetProxy(
						`Transaction error occured while purchasing ${this.selectedPlan.name}`,
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
}
