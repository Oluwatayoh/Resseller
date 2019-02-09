import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ONLINE } from '../public-script/global-config';

@Injectable()
export class PaystackVerificationService {
	baseUrl = `${ONLINE}paystackverifications`;
	constructor(private http: HttpClient) {}

	postPayStackVerification(data) {
		return this.http.post(this.baseUrl, data);
	}
}
