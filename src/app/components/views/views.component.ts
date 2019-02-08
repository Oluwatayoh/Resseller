import { Component, OnInit, OnDestroy } from '@angular/core';
import { Config } from '../../classes/config';
import { ThemeHelpersService } from '../../helpers/theme-helpers/theme-helpers.service';
import { DynamicScriptLoaderService } from './public-script/dynamic-script-loader-service';
declare var $: any;
@Component({
	selector: 'app-views',
	templateUrl: './views.component.html',
	styleUrls: [ './views.component.css' ]
})
export class ViewsComponent implements OnInit, OnDestroy {
	constructor(public themeHelper: ThemeHelpersService, private _dynamicScriptLoader: DynamicScriptLoaderService) {}

	ngOnInit() {
		// this.loadScripts();
		const body = document.getElementsByTagName('body')[0];
		body.classList.add(Config.THEME.views);
		this.themeHelper.viewsActivate();
	}

	// ngAfterViewInit() {
	//   this.themeHelper.viewsActivate();
	// }

	ngOnDestroy() {
		const body = document.getElementsByTagName('body')[0];
		body.classList.remove(Config.THEME.views);
	}
	private loadScripts() {
		// You can load multiple scripts by just providing the key as argument into load method of the service

		this._dynamicScriptLoader
			.load(
				'jquery'
				// 'bootstrap',
				// 'bootstrap-select',
				// 'jquery-slimscroll',
				// 'waves',
				// 'jquery-countto',
				// 'raphael',
				// 'morries',
				// 'chartjs',
				// 'jquery-flot',
				// 'jquery-flot-resize',
				// 'jquery-flot-pie',
				// 'jquery-flot-categories',
				// 'jquery-flot-time',
				// 'jquery-sparkline',
				// 'admin',
				// 'index',
				// 'demo'
			)
			.then((data) => {
				// Script Loaded Successfully
			})
			.catch((error) => console.log(error));
	}
}
