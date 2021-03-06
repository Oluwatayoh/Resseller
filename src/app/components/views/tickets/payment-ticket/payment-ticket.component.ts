import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { TicketService } from '../../services/ticket.service';
import { FormBuilder } from '@angular/forms';
import { SystemModuleService } from '../../public-script/system-module.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-payment-ticket',
	templateUrl: './payment-ticket.component.html',
	styleUrls: [ './payment-ticket.component.css' ]
})
export class PaymentTicketComponent implements OnInit {
	ticketType = 'PAYMENT';
	paymentList = [];
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
		this.getPaymentTickets();
	}

	getPaymentTickets() {
		this._ticketService.getTickets(this.customer.id, this.ticketType, true).subscribe(
			(payload: any) => {
				this.paymentList = payload;
			},
			(error) => {}
		);
	}
}
