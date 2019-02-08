import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { TicketService } from '../../services/ticket.service';
import { FormBuilder } from '@angular/forms';
import { SystemModuleService } from '../../public-script/system-module.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-message-ticket',
	templateUrl: './message-ticket.component.html',
	styleUrls: [ './message-ticket.component.css' ]
})
export class MessageTicketComponent implements OnInit {
	ticketType = 'MESSAGE';
	messagetList = [];
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
		this._ticketService.getTickets(this.customer.id, this.ticketType, false).subscribe(
			(payload: any) => {
				this.messagetList = payload;
				console.log(payload);
			},
			(error) => {}
		);
	}
}
