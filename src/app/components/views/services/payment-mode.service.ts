import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ONLINE } from '../public-script/global-config';

@Injectable()
export class PaymentModeService {
	baseUrl = `${ONLINE}paymentmodes`;
	constructor(private http: HttpClient) {}

	getPaymentModes() {
		return this.http.get(`${this.baseUrl}`);
	}

	postPaymentMode(paymentMode) {
		return this.http.post(this.baseUrl, paymentMode);
	}

	putPaymentMode(paymentMode) {
		return this.http.put(`${this.baseUrl}/${paymentMode.id}`, paymentMode);
	}
}
