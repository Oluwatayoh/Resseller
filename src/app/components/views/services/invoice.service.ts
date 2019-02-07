import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ONLINE } from '../public-script/global-config';

@Injectable()
export class InvoiceService {
	baseUrl = `${ONLINE}invoices`;
	constructor(private http: HttpClient) {}

	getInvoices(customerId, includeTransactions) {
		return this.http.get(`${this.baseUrl}/${customerId}?includeTransactions=${includeTransactions}`);
	}

	postInvoice(device) {
		return this.http.post(this.baseUrl, device);
	}

	putInvoice(device) {
		return this.http.put(`${this.baseUrl}/${device.id}`, device);
	}
}
