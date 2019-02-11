export interface InvoiceDetail {
	id: number;
	item: string;
	invoiceId?: number;
	productType: string;
	productId: number;
	price: number;
	quantity: number;
}
