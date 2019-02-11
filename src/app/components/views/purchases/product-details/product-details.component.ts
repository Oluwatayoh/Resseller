import { BroadcastShoppingCartService } from './../../public-script/broadcast-shopping-cart.service';
import { DeviceService } from './../../services/device.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: [ './product-details.component.scss' ]
})
export class ProductDetailsComponent implements OnInit {
	sub: Subscription;
	id = 0;
	selectedProduct: any;
	quantity = 1;
	constructor(
		private _activatedRoute: ActivatedRoute,
		private _deviceService: DeviceService,
		private _broadCastShopping: BroadcastShoppingCartService,
		private _router: Router
	) {}

	ngOnInit() {
		this.sub = this._activatedRoute.params.subscribe((params) => {
			this.id = params['id'];
			this._deviceService.getDevice(this.id).subscribe(
				(payload) => {
					this.selectedProduct = payload;
				},
				(error) => {
					console.log(error);
				}
			);
		});
	}
	addToCart() {
		this._broadCastShopping.announceCartOperation({
			product: this.selectedProduct,
			quantity: this.quantity,
			operation: 'add'
		});
		this._router.navigate([ '/views/product-list' ]);
	}
}
