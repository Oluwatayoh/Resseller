import { PaymentTicketComponent } from './tickets/payment-ticket/payment-ticket.component';
import { MessageTicketComponent } from './tickets/message-ticket/message-ticket.component';
import { BandwidthComponent } from './bandwidth/bandwidth.component';
import { DeviceComponent } from './device/device.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewsComponent } from './views.component';
import { HomeComponent } from './home/home.component';
// import { TypographyComponent } from './typography/typography.component';
import { HelperClassesComponent } from './helper-classes/helper-classes.component';
// import { BasicComponent } from './widgets/cards/basic/basic.component';
// import { ColoredComponent } from './widgets/cards/colored/colored.component';
// import { NoHeaderComponent } from './widgets/cards/no-header/no-header.component';
// import { Infobox1Component } from './widgets/infobox/infobox-1/infobox-1.component';
// import { Infobox2Component } from './widgets/infobox/infobox-2/infobox-2.component';
// import { Infobox3Component } from './widgets/infobox/infobox-3/infobox-3.component';
// import { Infobox4Component } from './widgets/infobox/infobox-4/infobox-4.component';
// import { Infobox5Component } from './widgets/infobox/infobox-5/infobox-5.component';

// import { AlertsComponent } from './ui/alerts/alerts.component';
// import { AnimationsComponent } from './ui/animations/animations.component';
// import { BadgesComponent } from './ui/badges/badges.component';
// import { BreadcrumbsComponent } from './ui/breadcrumbs/breadcrumbs.component';
// import { ButtonsComponent } from './ui/buttons/buttons.component';
// import { CollapseComponent } from './ui/collapse/collapse.component';
// import { ColorsComponent } from './ui/colors/colors.component';
// import { DialogsComponent } from './ui/dialogs/dialogs.component';
// import { IconsComponent } from './ui/icons/icons.component';
// import { LabelsComponent } from './ui/labels/labels.component';
// import { ListGroupComponent } from './ui/list-group/list-group.component';
// import { MediaObjectComponent } from './ui/media-object/media-object.component';
// import { ModalsComponent } from './ui/modals/modals.component';
// import { NotificationsComponent } from './ui/notifications/notifications.component';
// import { PaginationComponent } from './ui/pagination/pagination.component';
// import { PreloadersComponent } from './ui/preloaders/preloaders.component';
// import { ProgressbarsComponent } from './ui/progressbars/progressbars.component';
// import { RangeSlidersComponent } from './ui/range-sliders/range-sliders.component';
// import { SortableNestableComponent } from './ui/sortable-nestable/sortable-nestable.component';
// import { TabsComponent } from './ui/tabs/tabs.component';
// import { ThumbnailsComponent } from './ui/thumbnails/thumbnails.component';
// import { TooltipsPopoversComponent } from './ui/tooltips-popovers/tooltips-popovers.component';
// import { WavesComponent } from './ui/waves/waves.component';
// import { ProfileComponent } from './pages/profile/profile.component';
// import { BootstrapTablesComponent } from './tables/bootstrap-tables/bootstrap-tables.component';
// import { NgxTableComponent } from './tables/ngx-table/ngx-table.component';
// import { Ng2TableComponent } from './tables/ng2-table/ng2-table.component';
// import { NgxComponent } from './charts/ngx/ngx.component';
// import { AdvancedComponent } from './forms/advanced/advanced.component';
// import { EditorsComponent } from './forms/editors/editors.component';
// import { ExamplesComponent } from './forms/examples/examples.component';
// import { ValidationComponent } from './forms/validation/validation.component';
// import { WizardComponent } from './forms/wizard/wizard.component';
// import { GoogleComponent } from './maps/google/google.component';
// import { BlankComponent } from './pages/blank/blank.component';
// import { ImageGalleryComponent } from './medias/image-gallery/image-gallery.component';
// import { CarouselComponent } from './medias/carousel/carousel.component';
// import { YandexComponent } from './maps/yandex/yandex.component';
// import { JvectorComponent } from './maps/jvector/jvector.component';
// import { BasicFormsComponent } from './forms/basic-forms/basic-forms.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactHistoryComponent } from './payment/transact-history/transact-history.component';
import { InvoicesComponent } from './payment/invoices/invoices.component';
import { ProductListComponent } from './purchases/product-list/product-list.component';
import { MyCartComponent } from './purchases/my-cart/my-cart.component';
import { SupportTicketComponent } from './tickets/support-ticket/support-ticket.component';
import { ProductDetailsComponent } from './purchases/product-details/product-details.component';
import { BandwidthDetailsComponent } from './purchases/product-details/bandwidth-details/bandwidth-details.component';
import { NigcomsatOrderComponent } from './purchases/nigcomsat-order/nigcomsat-order.component';
const viewsRoutes: Routes = [
	{
		path: 'views',
		component: ViewsComponent,
		children: [
			{ path: 'home', component: HomeComponent },
			{ path: 'profile', component: ProfileComponent },
			{ path: 'bandwidth', component: BandwidthComponent },
			{ path: 'bandwidth-details/:id', component: BandwidthDetailsComponent },
			{ path: 'device', component: DeviceComponent },
			{ path: 'invoice', component: InvoicesComponent },
			{ path: 'history', component: TransactHistoryComponent },
			{ path: 'product-list', component: ProductListComponent },
			{ path: 'product-detail/:id', component: ProductDetailsComponent },
			{ path: 'cart', component: MyCartComponent },
			{ path: 'nigcomsat-orders', component: NigcomsatOrderComponent },
			{ path: 'support-ticket', component: SupportTicketComponent },
			{ path: 'payment-ticket', component: PaymentTicketComponent },
			{ path: 'message-ticket', component: MessageTicketComponent },
			{ path: '', redirectTo: 'profile', pathMatch: 'full' }
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(viewsRoutes) ],
	exports: [ RouterModule ]
})
export class ViewsRoutingModule {}
