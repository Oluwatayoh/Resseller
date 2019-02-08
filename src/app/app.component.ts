import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SystemModuleService } from './components/views/public-script/system-module.service';
// import { LoadingBarService } from '@ngx-loading-bar/core';
import swal from 'sweetalert2';
import { DynamicScriptLoaderService } from './components/views/public-script/dynamic-script-loader-service';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	title = 'nigcomsat';
	loaderSubscription: Subscription;
	private sweetAlertSubscription: Subscription;
	constructor(
		private systemModuleService: SystemModuleService,
		private _dynamicScriptLoader: DynamicScriptLoaderService
	) {
		// this.loadScripts();
		this.loaderSubscription = this.systemModuleService.loadingAnnounced$.subscribe((value: any) => {
			if (value.status === 'On') {
				// this.loadingService.start();
			} else {
				// this.loadingService.complete();
			}
		});

		this.sweetAlertSubscription = this.systemModuleService.sweetAnnounced$.subscribe((value: any) => {
			this._sweetNotification(value);
		});
	}

	_sweetNotification(value) {
		if (value.type === 'success') {
			swal({
				title: value.title,
				type: 'success',
				text: value.text,
				html: value.html,
				position: value.position !== undefined && value.position !== null ? value.position : 'top-end',
				showConfirmButton:
					value.showConfirmButton !== undefined && value.showConfirmButton !== null
						? value.showConfirmButton
						: false,
				timer: value.timer !== undefined && value.timer !== null ? value.timer : 2000
			}).then((result) => {
				if (value.cp !== undefined && value.cp !== null) {
					value.cp.sweetAlertCallback(result);
				}
			});
		} else if (value.type === 'error') {
			swal({
				title: value.title,
				type: 'error',
				text: value.text,
				html: value.html
			});
		} else if (value.type === 'info') {
			swal({
				title: value.title,
				type: 'info',
				text: value.text,
				html: value.html
			});
		} else if (value.type === 'warning') {
			swal({
				title: value.title,
				type: 'warning',
				text: value.text,
				html: value.html
			});
		} else if (value.type === 'question') {
			swal({
				title: value.title,
				text: value.text,
				type: value.type,
				html: value.html,
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes!'
			}).then((result) => {
				value.cp.sweetAlertCallback(result, value.from);
			});
		}
	}

	private loadScripts() {
		// You can load multiple scripts by just providing the key as argument into load method of the service

		this._dynamicScriptLoader
			.load('jquery', 'admin')
			.then((data) => {
				// Script Loaded Successfully
			})
			.catch((error) => console.log(error));
	}
}
