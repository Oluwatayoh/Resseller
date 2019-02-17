import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ONLINE } from '../public-script/global-config';

@Injectable()
export class DataplanService {
	baseUrl = `${ONLINE}dataplans`;
	constructor(private http: HttpClient) {}

	getDataPlans(includeTransactions) {
		return this.http.get(`${this.baseUrl}?includeTransactions=${includeTransactions}`);
	}

	getDataPlan(id) {
		return this.http.get(`${this.baseUrl}/${id}?includeTransactions=${true}`);
	}

	postDataPlan(dataPlan) {
		return this.http.post(this.baseUrl, dataPlan);
	}

	putDataPlan(dataPlan) {
		return this.http.put(`${this.baseUrl}/${dataPlan.id}`, dataPlan);
	}
}
