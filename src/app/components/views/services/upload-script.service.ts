import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ONLINE } from '../public-script/global-config';

@Injectable()
export class UploadScriptService {
	baseUrl = `${ONLINE}uploadgenericfile`;
	constructor(private http: HttpClient) {}
	postRecord(entityId, recordType, formData) {
		const uploadReq = new HttpRequest(
			'POST',
			`${this.baseUrl}/${entityId}/${recordType}/uploadgenericfile`,
			formData,
			{
				reportProgress: true
			}
		);

		return this.http.request(uploadReq);
	}
}
