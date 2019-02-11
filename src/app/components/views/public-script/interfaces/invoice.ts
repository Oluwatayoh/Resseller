export interface Invoice {
	id: number;
	invoiceNumber: string;
	invoiceDate: Date;
	customerId: string;
	invoiceDetails: any;
}
