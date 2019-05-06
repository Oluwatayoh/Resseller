import { UploadScriptService } from './../../services/upload-script.service';
import { TicketService } from './../../services/ticket.service';
import { Component, OnInit, Input } from '@angular/core';
import { ONLINEPATH } from '../../public-script/global-config';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
	selector: 'app-ticket-thread',
	templateUrl: './ticket-thread.component.html',
	styleUrls: [ './ticket-thread.component.scss' ]
})
export class TicketThreadComponent implements OnInit {
	@Input() ticket: any;
	message = '';
	baseUrl = `${ONLINEPATH}`;
	formData = new FormData();
	constructor(private _ticketService: TicketService, private _uploadScriptService: UploadScriptService) {}

	ngOnInit() {}

	replyMessage() {
		const response = {
			message: this.message,
			responseSource: 'sent',
			dateMessageSent: new Date()
		};
		this._ticketService.postTicketResponse(this.ticket.id, response).subscribe(
			(payload) => {
				this.ticket = payload;
				this.message = '';
				this.uploadTicketResponseAttachement(
					this.ticket.ticketResponses[this.ticket.ticketResponses.length - 1]
				);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	uploadTicketResponseAttachement(response) {
		this._uploadScriptService.postRecord(response.id, 'ticketResponse', this.formData).subscribe((event: any) => {
			if (event.type === HttpEventType.UploadProgress) {
				// this.progress = Math.round(100 * event.loaded / event.total);
			} else if (event.type === HttpEventType.Response) {
				if (event.status === 200) {
					response.fileName = event.body.fileName;
					this._ticketService.putTicketResponse(response).subscribe((payload) => {}, (error) => {});
					this.message = ''; // event.body.toString();
				} else {
					console.log('error');
				}
			}
		});
	}

	upload(files) {
		this.formData = new FormData();
		if (files.length === 0) {
			return;
		}

		for (const file of files) {
			this.formData.append(file.name, file);
		}
	}
}
