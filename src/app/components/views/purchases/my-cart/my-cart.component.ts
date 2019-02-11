import { PaymentModeService } from './../../services/payment-mode.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { BroadcastShoppingCartService } from '../../public-script/broadcast-shopping-cart.service';
import { Invoice } from '../../public-script/interfaces/invoice';
import { InvoiceDetail } from '../../public-script/interfaces/invoice-detail';
import { InvoiceService } from '../../services/invoice.service';
import { FormControl } from '@angular/forms';
import { PAYSTACK_CLIENT_KEY } from '../../public-script/global-config';
import { PaystackVerificationService } from '../../services/paystack-verification.service';
import { SystemModuleService } from '../../public-script/system-module.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-my-cart',
	templateUrl: './my-cart.component.html',
	styleUrls: [ './my-cart.component.scss' ]
})
export class MyCartComponent implements OnInit, OnDestroy {
	@ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
	cart: any[] = [];
	subscription: Subscription;
	customer: any;
	paymentModes: any;
	paymentMode: FormControl = new FormControl();
	hideOnlinePayment = true;
	currentInvoice: any;
	paystackClientKey: string = PAYSTACK_CLIENT_KEY;
	refKey: string;
	constructor(
		private _locker: CoolLocalStorage,
		private _broadCastShoppingService: BroadcastShoppingCartService,
		private _paymentModeService: PaymentModeService,
		private _invoiceService: InvoiceService,
		private _payStackVerificationService: PaystackVerificationService,
		private _systemModuleService: SystemModuleService,
		private _router: Router
	) {
		this.subscription = this._broadCastShoppingService.cartUpdateAnnounced$.subscribe((value: any) => {
			if (value.operation === 'add') {
				let innerCart: any[] = this._locker.getObject('cart');
				if (innerCart === undefined) {
					innerCart = [];
				}
				if (value.operation === 'add') {
					innerCart.push(value);
					this._locker.setObject('cart', innerCart);
					this.cart = innerCart;
				}
			} else if (value.operation === 'refresh') {
				this.cart = this._locker.getObject('cart');
			}
		});
	}

	ngOnInit() {
		this.customer = this._locker.getObject('selectedCustomer');
		this.cart = this._locker.getObject('cart');
		this.refKey = (this.customer ? this.customer.id.toString() : '') + new Date().getTime();
		this.getPaymentModes();
		this.paymentMode.valueChanges.subscribe((value) => {
			if (value === 'Online Payment') {
				this.hideOnlinePayment = false;
			} else {
				this.hideOnlinePayment = true;
			}
		});
	}

	getPaymentModes() {
		this._paymentModeService.getPaymentModes().subscribe(
			(payload: any) => {
				this.paymentModes = payload;
				this.paymentMode.setValue('Online Payment');
			},
			(error) => {
				console.log(error);
			}
		);
	}

	getTotal() {
		let sum = 0;
		this.cart.forEach((product) => {
			const sub = product.product.price * product.quantity;
			sum = sum + sub;
		});
		return sum;
	}

	removeProduct(product, index) {
		this.cart.splice(index, 1);
		this._locker.setObject('cart', this.cart);
		this._broadCastShoppingService.announceCartOperation({ operation: 'refresh' });
	}
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
	checkOut() {
		const invoice: Invoice = <Invoice>{
			id: 0,
			invoiceNumber: '',
			invoiceDate: new Date(),
			customerId: this.customer.id.toString(),
			invoiceDetails: [],
			total: this.getTotal()
		};
		this.cart.forEach((product) => {
			const detail: InvoiceDetail = <InvoiceDetail>{
				item: product.product.name,
				productType: product.product.dataPlanId === undefined ? 'Data Plan' : 'Device',
				productId: product.product.id,
				price: product.product.price,
				quantity: product.quantity
			};
			invoice.invoiceDetails.push(detail);
		});
		this._invoiceService.postInvoice(invoice).subscribe(
			(payload) => {
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

			const amount = parseFloat(this.getTotal().toString());
			const walletTransaction: any = {
				payStackReponse: paymentRes,
				amount: amount,
				customerId: this.customer.id,
				transactionType: 'Device',
				invoiceId: this.currentInvoice.id
			};

			this._payStackVerificationService.postPayStackVerification(walletTransaction).subscribe(
				(payload) => {
					this._systemModuleService.announceSweetProxy(
						`Successfully purchased items with Invoice Number ${this.currentInvoice.invoiceNumber}`,
						'success',
						null,
						null,
						null,
						null,
						null,
						null,
						null
					);
					this._locker.setObject('cart', []);
					this._broadCastShoppingService.announceCartOperation({ operation: 'refresh' });
					this.closeAddExpenseModal.nativeElement.click();
					this._router.navigate([ '/views/product-list' ]);
				},
				(error) => {
					this._systemModuleService.announceSweetProxy(
						`Transaction error occured while purchasing items with Invoice Number ${this.currentInvoice
							.invoiceNumber}`,
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
