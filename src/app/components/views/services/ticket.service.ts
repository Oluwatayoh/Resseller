import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ONLINE } from '../public-script/global-config';

@Injectable()
export class TicketService {
	baseUrl = `${ONLINE}tickets`;
	constructor(private http: HttpClient) {}

	getTickets(customerId, ticketType, includeTransactions) {
		return this.http.get(`${this.baseUrl}/${customerId}/${ticketType}?includeTransactions=${includeTransactions}`);
	}

	postTicket(ticket) {
		return this.http.post(this.baseUrl, ticket);
	}

	postTicketResponse(ticketId, response) {
		return this.http.post(`${ONLINE}ticketresponses/${ticketId}`, response);
	}

	putTicketResponse(response) {
		return this.http.put(`${ONLINE}ticketresponses/${response.id}`, response);
	}

	putTicket(ticket) {
		return this.http.put(`${this.baseUrl}/${ticket.id}`, ticket);
	}
}
