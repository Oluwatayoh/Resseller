import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
	HttpResponseBase
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
@Injectable()
export class EmptyBodyInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((response) => {
				if (response instanceof HttpErrorResponse) {
					// Check if this error has a 2xx status
					if (this.is2xxStatus(response)) {
						// Convert the error to a standard response with a null body and then return
						return of(
							new HttpResponse({
								headers: response.headers,
								status: response.status,
								statusText: response.statusText,
								url: response.url
							})
						);
					}
				}

				// This is a real error, rethrow
				return _throw(response);
			})
		);
	}

	private is2xxStatus(response: HttpResponseBase) {
		return (response.status >= 200 && response.status < 300) || response.status === 0;
	}
}
