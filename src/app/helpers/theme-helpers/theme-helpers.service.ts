import { Injectable } from '@angular/core';
declare var $: any;

@Injectable()
export class ThemeHelpersService {
	constructor() {}

	viewsActivate() {
		console.log($);
		$.AdminBSB.browser.activate();
		$.AdminBSB.leftSideBar.activate();
		$.AdminBSB.rightSideBar.activate();
		$.AdminBSB.navbar.activate();
		$.AdminBSB.dropdownMenu.activate();
		$.AdminBSB.input.activate();
		$.AdminBSB.select.activate();
		$.AdminBSB.search.activate();
		setTimeout(function() {
			$('.page-loader-wrapper').fadeOut();
		}, 50);
	}

	landingActivate() {}
}
