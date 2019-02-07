import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ONLINE } from '../public-script/global-config';

@Injectable()
export class CustomerDeviceTransactionsService {
	baseUrl = `${ONLINE}customerdevicetransactions`;

	constructor(private http: HttpClient) {}

	getCustomerDeviceTransactions(customerId, includeTransactions) {
		return this.http.get(`${this.baseUrl}/${customerId}?includeTransactions=${includeTransactions}`);
	}

	postCustomerDeviceTransactions(customerDeviceTransactions) {
		return this.http.post(this.baseUrl, customerDeviceTransactions);
	}

	putCustomerDeviceTransactions(customerDeviceTransactions) {
		return this.http.put(`${this.baseUrl}/${customerDeviceTransactions.id}`, customerDeviceTransactions);
	}
}
