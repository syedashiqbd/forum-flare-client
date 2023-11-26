import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);

const Payment = () => {
  return (
    <div className="w-6/12 mx-auto mt-10">
      <p className="text-center text-3xl font-bold border-t-2 border-b-2 py-4 w-8/12 mx-auto mb-20 text-amber-600">
        Pay for Gold Membership !!!
      </p>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};
export default Payment;
