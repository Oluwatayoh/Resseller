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
import { HttpClientModule } from '@angular/common/http';
import { CoolStorageModule } from 'angular2-cool-storage';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

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
		SystemModuleService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
