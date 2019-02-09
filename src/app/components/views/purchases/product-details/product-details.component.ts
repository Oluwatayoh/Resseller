import { DeviceService } from './../../services/device.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: [ './product-details.component.scss' ]
})
export class ProductDetailsComponent implements OnInit {
	sub: Subscription;
	id = 0;
	constructor(private _activatedRoute: ActivatedRoute, private _deviceService: DeviceService) {}

	ngOnInit() {
		this.sub = this._activatedRoute.params.subscribe((params) => {
			this.id = params['id'];
			this._deviceService.getDevice(this.id).subscribe(
				(payload) => {
					console.log(payload);
				},
				(error) => {
					console.log(error);
				}
			);
			console.log(this.id);
		});
		console.log(this.id);
	}
}
