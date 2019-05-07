import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { PAYSTACK_CLIENT_KEY, ONLINEPATH } from '../../public-script/global-config';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { BroadcastShoppingCartService } from '../../public-script/broadcast-shopping-cart.service';
import { PaymentModeService } from '../../services/payment-mode.service';
import { InvoiceService } from '../../services/invoice.service';
import { PaystackVerificationService } from '../../services/paystack-verification.service';
import { SystemModuleService } from '../../public-script/system-module.service';
import { Router } from '@angular/router';
import { Invoice } from '../../public-script/interfaces/invoice';
import { InvoiceDetail } from '../../public-script/interfaces/invoice-detail';
import { DispatchInvoiceDataService } from '../../services/dispatch-invoice-data.service';

@Component({
	selector: 'app-nigcomsat-order',
	templateUrl: './nigcomsat-order.component.html',
	styleUrls: [ './nigcomsat-order.component.scss' ]
})
export class NigcomsatOrderComponent implements OnInit, OnDestroy {
	@ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
	cart: any[] = [];
	subscription: Subscription;
	customer: any;
	paymentModes: any;
	paymentMode: FormControl = new FormControl();
	hideOnlinePayment = true;
	courier = false;
	reseller = false;
	currentInvoice: any;
	paystackClientKey: string = PAYSTACK_CLIENT_KEY;
	refKey: string;
	checkedAll: false;
	dispatchMethods: any;
	dispatchMethod = [
		{
			id: 1,
			name: 'By Courier'
		},
		{
			id: 2,
			name: 'By Reseller'
		}
	];
	dispatchMethodForm: FormControl = new FormControl();
	baseUrl = `${ONLINEPATH}`;
	orders = [];
	constructor(
		private _locker: CoolLocalStorage,
		private _broadCastShoppingService: BroadcastShoppingCartService,
		private _paymentModeService: PaymentModeService,
		private _invoiceService: InvoiceService,
		private _payStackVerificationService: PaystackVerificationService,
		private _systemModuleService: SystemModuleService,
		private _dispatchInvoiceDataService: DispatchInvoiceDataService,
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
		this.reseller = this._locker.getObject('selectedReseller');
		this.cart = this._locker.getObject('cart');
		this.refKey = (this.customer ? this.customer.id.toString() : '') + new Date().getTime();
		this.getPaymentModes();
		this.dispatchMethodForm.valueChanges.subscribe((value) => {
			if (value === 'By Courier') {
				this.courier = true;
			} else {
				this.courier = false;
			}
		});
		this.dispatchMethodForm.valueChanges.subscribe((value) => {
			if (value === 'By Reseller') {
				this.reseller = true;
			} else {
				this.reseller = false;
			}
		});
		this.paymentMode.valueChanges.subscribe((value) => {
			if (value === 'Online Payment') {
				this.hideOnlinePayment = false;
			} else {
				this.hideOnlinePayment = true;
			}
		});
		this.getResellerOrders();
	}

	getResellerOrders() {
		this._dispatchInvoiceDataService.getDispatchInvoiceData(this.reseller.id).subscribe(
			(payload: any) => {
				this.orders = payload;
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
				this.paymentMode.setValue('Online Payment');
			},
			(error) => {}
		);
	}

	getTotal() {
		let sum = 0;
		this.cart.forEach((product) => {
			if (product.product.dataPlan !== undefined) {
				const sub = (product.product.price + product.product.dataPlan.price) * product.quantity;
				sum = sum + sub;
			} else {
				const sub = product.product.price * product.quantity;
				sum = sum + sub;
			}
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
			if (product.product.dataPlanId === undefined) {
				// Buying DataPlan
				const detail: InvoiceDetail = <InvoiceDetail>{
					item: product.product.name,
					productType: product.product.dataPlanId === undefined ? 'Data Plan' : 'Device',
					productId: product.product.id,
					price: product.product.price,
					quantity: product.quantity,
					deviceId: product.device.id
				};
				invoice.invoiceDetails.push(detail);
			} else {
				// Buying Device
				const detail: InvoiceDetail = <InvoiceDetail>{
					item: product.product.name,
					productType: product.product.dataPlanId === undefined ? 'Data Plan' : 'Device',
					productId: product.product.id,
					price: product.product.price + product.product.dataPlan.price,
					quantity: product.quantity
					// deviceId: product.device.id
				};
				invoice.invoiceDetails.push(detail);
			}
		});
		this._invoiceService.postInvoice(invoice).subscribe(
			(payload) => {
				this.currentInvoice = JSON.parse(payload);
			},
			(error) => {}
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

	onSelectCourier() {
		this.courier = true;
		this.reseller = false;
	}

	onSelectReseller() {
		this.courier = false;
		this.reseller = true;
	}

	checkAll(event) {
		const value = event.target.checked;
		this.cart.forEach((item) => {
			item.checked = value;
		});
	}
	isAnyChecked() {
		return this.cart.filter((c) => c.checked).length > 0;
	}
	onChecked(event, product) {
		const value = event.target.checked;
		product.checked = value;
	}
}
