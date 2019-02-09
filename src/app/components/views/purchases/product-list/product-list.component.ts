import { ProductListService } from './../../services/product-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: [ './product-list.component.scss' ]
})
export class ProductListComponent implements OnInit {
	productList: any[];
	constructor(private _productListService: ProductListService) {}

	ngOnInit() {
		this.getProductList();
	}

	getProductList() {
		this._productListService.getProductList(true).subscribe(
			(results: any) => {
				this.productList = [ ...results[0], ...results[1] ];
				this.productList = this.shuffle(this.productList);
				console.log(this.productList);
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
		console.log(product);
		return product.id;
	}
}
