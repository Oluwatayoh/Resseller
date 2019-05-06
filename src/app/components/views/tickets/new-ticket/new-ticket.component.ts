import { TicketService } from './../../services/ticket.service';
import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { CustomersService } from '../../services/customers.service';
import { SystemModuleService } from '../../public-script/system-module.service';
import { Router } from '@angular/router';
import { UploadScriptService } from '../../services/upload-script.service';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
	selector: 'app-new-ticket',
	templateUrl: './new-ticket.component.html',
	styleUrls: [ './new-ticket.component.scss' ]
})
export class NewTicketComponent implements OnInit {
	@Input() ticketType = '';
	@ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
	@Output() completeOperation: EventEmitter<any> = new EventEmitter<any>();
	customerForm: FormGroup;
	customer: any;
	formData = new FormData();
	constructor(
		private _locker: CoolLocalStorage,
		private _ticketService: TicketService,
		private _formBuilder: FormBuilder,
		private _systemModuleService: SystemModuleService,
		private _router: Router,
		private _uploadScriptService: UploadScriptService
	) {}

	ngOnInit() {
		this.customer = this._locker.getObject('selectedCustomer');
		this.customerForm = this._formBuilder.group({
			subject: [ '', [ <any>Validators.required, Validators.minLength(3) ] ],
			priority: [ 'Minor', [ <any>Validators.required ] ],
			status: [ 'New', [ <any>Validators.required ] ],
			message: [ '', [ <any>Validators.required, Validators.minLength(20) ] ],
			ticketType: [ this.ticketType, [ <any>Validators.required ] ],
			customerId: [ this.customer.id, [ <any>Validators.required ] ],
			dateCreated: [ new Date(), [ <any>Validators.required ] ]
		});
	}

	addTicket() {
		const ticket = {
			subject: this.customerForm.controls['subject'].value,
			priority: this.customerForm.controls['priority'].value,
			status: this.customerForm.controls['status'].value,
			ticketType: this.customerForm.controls['ticketType'].value,
			customerId: this.customerForm.controls['customerId'].value,
			dateCreated: this.customerForm.controls['dateCreated'].value,
			ticketResponses: []
		};
		ticket.ticketResponses.push({
			message: this.customerForm.controls['message'].value,
			responseSource: 'sent',
			dateMessageSent: ticket.dateCreated
		});
		this._ticketService.postTicket(ticket).subscribe(
			(payload: any) => {
				this.uploadTicketResponseAttachement(payload.ticketResponses[payload.ticketResponses.length - 1]);
				this.completeOperation.emit(payload);
				this._systemModuleService.announceSweetProxy(
					'Ticket sent successfully',
					'success',
					null,
					null,
					null,
					null,
					null,
					null,
					null
				);
				this.closeAddExpenseModal.nativeElement.click();
			},
			(error) => {
				this._systemModuleService.announceSweetProxy(
					'An error occured while sending the ticket',
					'error',
					null,
					null,
					null,
					null,
					null,
					null,
					null
				);
			}
		);
	}

	uploadTicketResponseAttachement(response) {
		this._uploadScriptService.postRecord(response.id, 'ticketResponse', this.formData).subscribe((event: any) => {
			if (event.type === HttpEventType.UploadProgress) {
			} else if (event.type === HttpEventType.Response) {
				if (event.status === 200) {
					response.fileName = event.body.fileName;
					this._ticketService.putTicketResponse(response).subscribe((payload) => {}, (error) => {});
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
