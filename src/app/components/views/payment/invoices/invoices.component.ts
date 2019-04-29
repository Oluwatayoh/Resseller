import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';

@Component({
	selector: 'app-invoices',
	templateUrl: './invoices.component.html',
	styleUrls: [ './invoices.component.scss' ]
})
export class InvoicesComponent implements OnInit {
	customer;
	invoices = [];
	selectedInvoice: any;
	details: Object;
	constructor(
		private _locker: CoolLocalStorage,
		private _customerInvoiceService: InvoiceService,
		private _formBuilder: FormBuilder,
		private _router: Router
	) {}

	ngOnInit() {
		this.customer = this._locker.getObject('selectedCustomer');
		this.getInvoices();
	}

	getInvoices() {
		this._customerInvoiceService.getInvoices(this.customer.id, true).subscribe(
			(payload: any) => {
				this.invoices = payload;
			},
			(error) => {
				console.log(error);
			}
		);
	}

	filterSearch() {
		// Declare variables
		var input, filter, table, tr, td, i, txtValue;
		input = document.getElementById('myInput');
		filter = input.value.toUpperCase();
		table = document.getElementById('myTable');
		tr = table.getElementsByTagName('tr');

		// Loop through all table rows, and hide those who don't match the search query
		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName('td')[1];
			if (td) {
				txtValue = td.textContent || td.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					tr[i].style.display = '';
				} else {
					tr[i].style.display = 'none';
				}
			}
		}
	}

	viewDetail(invoice) {
		this.selectedInvoice = invoice;
		this._customerInvoiceService.getInvoiceDetails(invoice.id, false).subscribe(
			(payload) => {
				this.details = payload;
			},
			(error) => {
				console.log(error);
			}
		);
	}
}
