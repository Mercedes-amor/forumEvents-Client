import service from "./service.config";

const createPaymentIntentService = (productId) => {
  return service.post("/payment/create-payment-intent", productId)
}

export { createPaymentIntentService };