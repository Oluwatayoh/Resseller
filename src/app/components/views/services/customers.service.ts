import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { ONLINE } from '../public-script/global-config';
@Injectable()
export class CustomersService {
	private selectedCustomer = new Subject<any>();
	customerSelected = this.selectedCustomer.asObservable();
	baseUrl = `${ONLINE}customers`;
	constructor(private http: HttpClient) {}

	getCustomers() {
		return this.http.get(this.baseUrl);
	}

	postCustomer(customer) {
		return this.http.post(this.baseUrl, customer);
	}

	putCustomer(customer) {
		return this.http.put(`${this.baseUrl}/${customer.id}`, customer);
	}

	putCustomerPassword(id, current, password, customer) {
		return this.http.put(`${this.baseUrl}/${id}/changepassword?current=${current}&password=${password}`, customer);
	}

	loginCustomer(email, password) {
		return this.http.get(`${this.baseUrl}/${email}/login?password=${password}`);
	}

	selectCustomer(customer) {
		this.selectedCustomer.next(customer);
	}
}
