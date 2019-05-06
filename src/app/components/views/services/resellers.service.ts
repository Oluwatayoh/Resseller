import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { ONLINE } from '../public-script/global-config';
@Injectable()
export class ResellersService {
	private selectedReseller = new Subject<any>();
	resellerSelected = this.selectedReseller.asObservable();
	baseUrl = `${ONLINE}resellers`;
	constructor(private http: HttpClient) {}

	getResellers() {
		return this.http.get(this.baseUrl);
	}

	postReseller(reseller) {
		return this.http.post(this.baseUrl, reseller);
	}

	putReseller(reseller) {
		return this.http.put(`${this.baseUrl}/${reseller.id}`, reseller);
	}

	putResellerPassword(id, current, password, reseller) {
		return this.http.put(`${this.baseUrl}/${id}/changepassword?current=${current}&password=${password}`, reseller);
	}

	loginReseller(email, password) {
		return this.http.get(`${this.baseUrl}/${email}/login?password=${password}`);
	}

	selectReseller(reseller) {
		this.selectedReseller.next(reseller);
	}
}
