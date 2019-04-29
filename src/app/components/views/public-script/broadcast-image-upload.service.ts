import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BroadcastImageUploadService {
	private readonly imageUpdateAnnouncedSource = new Subject<Object>();
	imageUpdateAnnounced$ = this.imageUpdateAnnouncedSource.asObservable();

	constructor() {}

	announceLoading(announce: Object) {
		this.imageUpdateAnnouncedSource.next(announce);
	}
}
