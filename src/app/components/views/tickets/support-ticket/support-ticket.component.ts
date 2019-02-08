import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { TicketService } from '../../services/ticket.service';
import { FormBuilder } from '@angular/forms';
import { SystemModuleService } from '../../public-script/system-module.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-support-ticket',
	templateUrl: './support-ticket.component.html',
	styleUrls: [ './support-ticket.component.css' ]
})
export class SupportTicketComponent implements OnInit {
	ticketType = 'SUPPORT';
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
		this.getSupportTickets();
	}

	getSupportTickets() {
		this._ticketService.getTickets(this.customer.id, this.ticketType, false).subscribe(
			(payload: any) => {
				this.paymentList = payload;
			},
			(error) => {}
		);
	}
}
