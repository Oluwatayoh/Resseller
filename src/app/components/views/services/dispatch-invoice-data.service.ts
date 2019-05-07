import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ONLINE } from '../public-script/global-config';

@Injectable()
export class DispatchInvoiceDataService {
	baseUrl = `${ONLINE}dispatchInvoiceDatas`;
	constructor(private http: HttpClient) {}

	getDispatchInvoiceDatas(includeTransactions) {
		return this.http.get(`${this.baseUrl}?includeTransactions=${includeTransactions}`);
	}

	getDispatchInvoiceData(id) {
		return this.http.get(`${this.baseUrl}/${id}?includeTransactions=${true}`);
	}

	postDispatchInvoiceData(dispatchInvoiceData) {
		return this.http.post(this.baseUrl, dispatchInvoiceData);
	}

	putDispatchInvoiceData(dispatchInvoiceData) {
		return this.http.put(`${this.baseUrl}/${dispatchInvoiceData.id}`, dispatchInvoiceData);
	}
}
