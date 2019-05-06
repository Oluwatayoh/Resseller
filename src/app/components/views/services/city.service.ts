import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ONLINE } from '../public-script/global-config';

@Injectable()
export class CityService {
	baseUrl = `${ONLINE}cities`;

	constructor(private _httpClient: HttpClient) {}

	get() {
		return this._httpClient.get<any[]>(`${this.baseUrl}`);
	}
	add(newValue) {
		return this._httpClient.post(this.baseUrl, newValue);
	}
	update(obj) {
		return this._httpClient.put(`${this.baseUrl}/${obj.id}`, obj);
	}
}
