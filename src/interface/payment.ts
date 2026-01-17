export interface CreatePaymentPayload {
  order_id: string;
}

export interface CreatePaymentResponse {
  clientSecret: string;
  paymentId: string;
}