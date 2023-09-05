import service from "./service.config";

const createPaymentIntentService = (productId) => {
  return service.post("/payment/create-payment-intent", productId)
}



const updatePaymentIntentService = (paymentIntentInfo) => {
  return service.patch("/payment/update-payment-intent", paymentIntentInfo)
}




export { createPaymentIntentService, updatePaymentIntentService };