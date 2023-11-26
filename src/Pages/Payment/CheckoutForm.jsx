import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const totalPrice = 125;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axiosSecure
      .post('/create-payment-intent', { price: totalPrice })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('payment error', error);
      setError(error.message);
    } else {
      console.log('payment method', paymentMethod);
      setError('');
    }

    //payment confirm
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous',
          },
        },
      });
    if (confirmError) {
      console.log('confirm error', confirmError);
    } else {
      console.log('payment intent', paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        setTransactionId(paymentIntent.id);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Payment made successfully`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    }
  };
  return (
    <div>
      <form
        className="border w-10/12 mx-auto p-10 rounded"
        onSubmit={handleSubmit}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '18px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button
          className="btn btn-primary px-10 mt-10"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay Now
        </button>
        <p className="text-red-600 mt-3 text-center">{error}</p>
        {transactionId && (
          <p className="text-green-500 mt-5 font-semibold text-center">
            Your Transaction ID: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};
export default CheckoutForm;
