import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
	selector: 'app-ticket-list',
	templateUrl: './ticket-list.component.html',
	styleUrls: [ './ticket-list.component.scss' ]
})
export class TicketListComponent implements OnInit {
	@Input() ticketType = '';
	@Input() ticketDataList: any[] = [];
	constructor() {}

	ngOnInit() {}

	filterSearch() {
		// Declare variables
		let input, filter, table, tr, td, i, txtValue;
		input = document.getElementById('searchInput');
		filter = input.value.toUpperCase();
		table = document.getElementById('ticketList');
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
	completeOperation(value: any) {
		this.ticketDataList.push(value);
	}
}
