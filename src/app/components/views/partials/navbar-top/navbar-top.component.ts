import { Subscription } from 'rxjs/Subscription';
import { BroadcastShoppingCartService } from './../../public-script/broadcast-shopping-cart.service';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Config } from '../../../../classes/config';
import { ONLINEPATH } from '../../public-script/global-config';
import { DispatchInvoiceDataService } from '../../services/dispatch-invoice-data.service';

@Component({
	selector: 'app-navbar-top',
	templateUrl: './navbar-top.component.html',
	styleUrls: [ './navbar-top.component.scss' ]
})
export class NavbarTopComponent implements OnInit, OnDestroy {
	title: String = Config.APP.title;
	cart: any[] = [];
	subscription: Subscription;
	baseUrl = `${ONLINEPATH}`;
	reseller: any;
	orders = [];
	constructor(
		private _locker: CoolLocalStorage,
		private _broadCastShoppingService: BroadcastShoppingCartService,
		private _dispatchInvoiceDataService: DispatchInvoiceDataService
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
		this.cart = this._locker.getObject('cart');
		this.reseller = this._locker.getObject('selectedReseller');
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

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
