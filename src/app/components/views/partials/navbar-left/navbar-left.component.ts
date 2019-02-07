import { Component, OnInit } from '@angular/core';
import { Config } from '../../../../classes/config';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar-left',
	templateUrl: './navbar-left.component.html',
	styleUrls: [ './navbar-left.component.css' ]
})
export class NavbarLeftComponent implements OnInit {
	appInfo: any = Config.APP;

	constructor(private _router: Router) {}

	ngOnInit() {}

	signOut() {
		this._router.navigate([ '/auth' ]).then(
			(result) => {},
			(error) => {
				console.log(error);
			}
		);
	}
}
