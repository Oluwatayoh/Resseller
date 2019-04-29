import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BroadcastShoppingCartService {
	private readonly cartUpdateAnnouncedSource = new Subject<Object>();
	cartUpdateAnnounced$ = this.cartUpdateAnnouncedSource.asObservable();

	constructor() {}

	announceCartOperation(announce: Object) {
		this.cartUpdateAnnouncedSource.next(announce);
	}
}
