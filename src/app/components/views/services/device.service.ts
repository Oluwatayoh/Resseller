import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ONLINE } from '../public-script/global-config';

@Injectable()
export class DeviceService {
	baseUrl = `${ONLINE}devices`;
	constructor(private http: HttpClient) {}

	getDevices() {
		return this.http.get(`${this.baseUrl}`);
	}

	getDevice(id) {
		return this.http.get(`${this.baseUrl}/${id}?includeTransactions=${true}`);
	}

	postDevice(device) {
		return this.http.post(this.baseUrl, device);
	}

	putDevice(device) {
		return this.http.put(`${this.baseUrl}/${device.id}`, device);
	}
}
