import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ONLINE } from '../public-script/global-config';

@Injectable()
export class CustomerBandwidthTransactionsService {
	baseUrl = `${ONLINE}customerbandwidthtransactions`;
	constructor(private http: HttpClient) {}

	getCustomerBandWidthTransactions(customerId, includeTransactions) {
		return this.http.get(`${this.baseUrl}/${customerId}?includeTransactions=${includeTransactions}`);
	}

	postCustomerBandWidthTransactions(customerBandWidthTransactions) {
		return this.http.post(this.baseUrl, customerBandWidthTransactions);
	}

	putCustomerBandWidthTransactions(customerBandWidthTransactions) {
		return this.http.put(`${this.baseUrl}/${customerBandWidthTransactions.id}`, customerBandWidthTransactions);
	}
}
