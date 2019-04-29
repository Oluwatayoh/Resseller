import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ONLINE } from '../public-script/global-config';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class ProductListService {
	private baseUrl = `${ONLINE}dataplans`;
	private baseUrl2 = `${ONLINE}devices`;

	constructor(private http: HttpClient) {}

	getProductList(includeTransactions) {
		const dataPlans = this.http.get(`${this.baseUrl}?includeTransactions=${includeTransactions}`);
		const devices = this.http.get(`${this.baseUrl2}`);
		return forkJoin([ dataPlans, devices ]);
		// return this.http.get(`${this.baseUrl}?includeTransactions=${includeTransactions}`);
	}
}
