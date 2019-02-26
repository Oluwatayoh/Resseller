import { ProductListService } from './../../services/product-list.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PaymentModeService } from '../../services/payment-mode.service';
import { FormControl } from '@angular/forms';
import { Invoice } from '../../public-script/interfaces/invoice';
import { InvoiceDetail } from '../../public-script/interfaces/invoice-detail';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { InvoiceService } from '../../services/invoice.service';
import { PAYSTACK_CLIENT_KEY, ONLINEPATH } from '../../public-script/global-config';
import { PaystackVerificationService } from '../../services/paystack-verification.service';
import { SystemModuleService } from '../../public-script/system-module.service';
import { BroadcastShoppingCartService } from '../../public-script/broadcast-shopping-cart.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: [ './product-list.component.scss' ]
})
export class ProductListComponent implements OnInit, OnDestroy {
	@ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
	productList: any[];
	fullProductList: any[];
	selectedDataPlan: any;
	paymentModes: any;
	paymentMode: FormControl = new FormControl();
	hideOnlinePayment = true;
	customer: any;
	currentInvoice: any;
	paystackClientKey: string = PAYSTACK_CLIENT_KEY;
	refKey: string;
	selectedCategory: any = 'All';
	cart: any[] = [];
	subscription: Subscription;
	baseUrl = `${ONLINEPATH}`;
	constructor(
		private _productListService: ProductListService,
		private _locker: CoolLocalStorage,
		private _paymentModeService: PaymentModeService,
		private _invoiceService: InvoiceService,
		private _payStackVerificationService: PaystackVerificationService,
		private _systemModuleService: SystemModuleService,
		private _broadCastShoppingService: BroadcastShoppingCartService,
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
		this.getProductList();
		this.getPaymentModes();
		this.refKey = (this.customer ? this.customer.id.toString() : '') + new Date().getTime();
		this.paymentMode.valueChanges.subscribe((value) => {
			if (value === 'Online Payment') {
				this.hideOnlinePayment = false;
			} else {
				this.hideOnlinePayment = true;
			}
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	getProductList() {
		this._productListService.getProductList(true).subscribe(
			(results: any) => {
				this.productList = [ ...results[0], ...results[1] ];
				this.productList = this.shuffle(this.productList);
				this.fullProductList = this.productList;
			},
			(error) => {
				console.log(error);
			}
		);
	}
	shuffle(array) {
		let currentIndex = array.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	getId(product) {
		return product.id;
	}

	setDataPlan(product) {
		this.currentInvoice = undefined;
		this.selectedDataPlan = product;
		const invoice: Invoice = <Invoice>{
			id: 0,
			invoiceNumber: '',
			invoiceDate: new Date(),
			customerId: this.customer.id.toString(),
			invoiceDetails: [],
			total: product.price
		};
		const detail: InvoiceDetail = <InvoiceDetail>{
			item: product.name,
			productType: product.dataPlanId === undefined ? 'Data Plan' : 'Device',
			productId: product.id,
			price: product.price,
			quantity: 1
		};
		invoice.invoiceDetails.push(detail);
		this._invoiceService.postInvoice(invoice).subscribe(
			(payload) => {
				this.currentInvoice = JSON.parse(payload);
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

			const amount = parseFloat(this.selectedDataPlan.price.toString());
			const walletTransaction: any = {
				payStackReponse: paymentRes,
				amount: amount,
				customerId: this.customer.id,
				transactionType: 'Data Plan',
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

	onSelectCategory(value) {
		this.selectedCategory = value;
		if (value === 'All') {
			this.productList = this.fullProductList;
		} else if (value === 'Bandwidth') {
			this.productList = this.fullProductList.filter((c) => c.dataPlanId === undefined);
		} else if (value === 'Devices') {
			this.productList = this.fullProductList.filter((c) => c.dataPlanId !== undefined);
		}
	}
}
