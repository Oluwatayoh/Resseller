import { CityService } from './components/views/services/city.service';
import { BroadcastShoppingCartService } from './components/views/public-script/broadcast-shopping-cart.service';
import { ProductListService } from './components/views/services/product-list.service';
import { PaymentModeService } from './components/views/services/payment-mode.service';
import { TicketService } from './components/views/services/ticket.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Main Modules
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './components/auth/auth.module';
import { LandingModule } from './components/landing/landing.module';
import { ViewsModule } from './components/views/views.module';

// Main Components
import { AppComponent } from './app.component';

// Services
import { ThemeHelpersService } from './helpers/theme-helpers/theme-helpers.service';

// External Modules
import { FlashMessagesModule } from 'angular2-flash-messages';
import { CustomersService } from './components/views/services/customers.service';
import { CustomerBandwidthTransactionsService } from './components/views/services/customer-bandwidth-transactions.service';
import { PaystackVerificationService } from './components/views/services/paystack-verification.service';
import { DataplanService } from './components/views/services/dataplan.service';
import { DeviceService } from './components/views/services/device.service';
import { InvoiceService } from './components/views/services/invoice.service';
import { CustomerDeviceTransactionsService } from './components/views/services/customer-device-transactions.service';
import { SystemModuleService } from './components/views/public-script/system-module.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoolStorageModule } from 'angular2-cool-storage';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { DynamicScriptLoaderService } from './components/views/public-script/dynamic-script-loader-service';
import { EqualValidator } from './components/views/public-script/equal-validator.directive';
import { BroadcastImageUploadService } from './components/views/public-script/broadcast-image-upload.service';
import { EmptyBodyInterceptor } from './components/views/public-script/empty-body-interceptor.service';
import { UploadScriptService } from './components/views/services/upload-script.service';
import { ResellersService } from './components/views/services/resellers.service';
import { ShareModule } from './helpers/share/share.module';

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		FlashMessagesModule.forRoot(),
		LandingModule,
		AuthModule,
		ViewsModule,
		AppRoutingModule,
		HttpClientModule,
		CoolStorageModule,
		ShareModule,
		// LoadingBarHttpClientModule,
		SweetAlert2Module.forRoot()
	],
	providers: [
		ThemeHelpersService,
		CustomersService,
		CustomerBandwidthTransactionsService,
		PaystackVerificationService,
		DataplanService,
		DeviceService,
		InvoiceService,
		CustomerDeviceTransactionsService,
		SystemModuleService,
		TicketService,
		DynamicScriptLoaderService,
		PaymentModeService,
		BroadcastImageUploadService,
		BroadcastShoppingCartService,
		UploadScriptService,
		ProductListService,
		ResellersService,
		CityService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: EmptyBodyInterceptor,
			multi: true
		}
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
