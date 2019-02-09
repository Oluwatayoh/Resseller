import { ONLINE } from './../global-config';
import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
	selector: 'app-upload-component',
	templateUrl: './upload.component.html'
})
export class UploadComponent {
	@Output() completeOperation: EventEmitter<any> = new EventEmitter<any>();
	public progress: number;
	public message: string;
	baseUrl = `${ONLINE}customers`;
	customer: any;
	constructor(private http: HttpClient, private _locker: CoolLocalStorage) {
		this.customer = this._locker.getObject('selectedCustomer');
	}

	upload(files) {
		if (files.length === 0) {
			return;
		}

		const formData = new FormData();

		for (const file of files) {
			formData.append(file.name, file);
		}
		const uploadReq = new HttpRequest(
			'POST',
			`${this.baseUrl}/${this.customer.id}/${'customer'}/uploadfile`,
			formData,
			{
				reportProgress: true
			}
		);

		this.http.request(uploadReq).subscribe((event) => {
			if (event.type === HttpEventType.UploadProgress) {
				this.progress = Math.round(100 * event.loaded / event.total);
			} else if (event.type === HttpEventType.Response) {
				console.log(event);
				this.message = 'Upload Successful'; // event.body.toString();
				this.completeOperation.emit(event.body);
			}
		});
	}
}
