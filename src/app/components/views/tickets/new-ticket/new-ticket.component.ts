import { TicketService } from './../../services/ticket.service';
import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { CustomersService } from '../../services/customers.service';
import { SystemModuleService } from '../../public-script/system-module.service';
import { Router } from '@angular/router';

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
	constructor(
		private _locker: CoolLocalStorage,
		private _ticketService: TicketService,
		private _formBuilder: FormBuilder,
		private _systemModuleService: SystemModuleService,
		private _router: Router
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
		this._ticketService.postTicket(this.customerForm.value).subscribe(
			(payload) => {
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
}
