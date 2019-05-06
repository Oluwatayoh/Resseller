import { ShareModule } from './../../helpers/share/share.module';
import { TicketListComponent } from './tickets/ticket-list/ticket-list.component';
import { TransactHistoryPreviewComponent } from './payment/transact-history/transact-history-preview/transact-history-preview.component';
import { TransactHistoryComponent } from './payment/transact-history/transact-history.component';
import { BandwidthComponent } from './bandwidth/bandwidth.component';
import { BuyComponent } from './bandwidth/buy/buy.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';
import { NavbarTopComponent } from './partials/navbar-top/navbar-top.component';
import { NavbarLeftComponent } from './partials/navbar-left/navbar-left.component';
import { HomeComponent } from './home/home.component';
// import { TypographyComponent } from './typography/typography.component';
import { HelperClassesComponent } from './helper-classes/helper-classes.component';
import { ProfileComponent } from './profile/profile.component';
import { DeviceComponent } from './device/device.component';
import { Angular4PaystackModule } from 'angular4-paystack';
import { InvoicesComponent } from './payment/invoices/invoices.component';
import { NewTicketComponent } from './tickets/new-ticket/new-ticket.component';
import { ProductListComponent } from './purchases/product-list/product-list.component';
import { ProductDetailsComponent } from './purchases/product-details/product-details.component';
import { MyCartComponent } from './purchases/my-cart/my-cart.component';
import { PaymentTicketComponent } from './tickets/payment-ticket/payment-ticket.component';
import { MessageTicketComponent } from './tickets/message-ticket/message-ticket.component';
import { SupportTicketComponent } from './tickets/support-ticket/support-ticket.component';
import { UploadComponent } from './public-script/upload/upload.component';
import { BandwidthDetailsComponent } from './purchases/product-details/bandwidth-details/bandwidth-details.component';
import { TicketThreadComponent } from './tickets/ticket-thread/ticket-thread.component';
@NgModule({
	imports: [
		CommonModule,
		ViewsRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		Angular4PaystackModule,
		ShareModule
	],
	declarations: [
		ViewsComponent,
		NavbarTopComponent,
		NavbarLeftComponent,
		HomeComponent,
		// TypographyComponent,
		HelperClassesComponent,
		ProfileComponent,
		BuyComponent,
		DeviceComponent,
		BandwidthComponent,
		InvoicesComponent,
		TransactHistoryComponent,
		TransactHistoryPreviewComponent,
		NewTicketComponent,
		ProductListComponent,
		ProductDetailsComponent,
		MyCartComponent,
		TicketListComponent,
		PaymentTicketComponent,
		MessageTicketComponent,
		SupportTicketComponent,
		UploadComponent,
		BandwidthDetailsComponent,
		TicketThreadComponent
	],
	providers: []
})
export class ViewsModule {}
