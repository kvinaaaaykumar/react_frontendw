import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState(1000); // Amount in cents (1000 = $10)
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setMessage(error.message);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/payment', {
                amount,
                token: paymentMethod,
            });

            if (response.data.success) {
                setMessage('Payment successful!');
            } else {
                setMessage('Payment failed. Please try again.');
            }
        } catch (err) {
            setMessage('Payment failed. Please try again.');
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Amount:
                <input 
                    type="number" 
                    value={amount / 100} 
                    onChange={(e) => setAmount(e.target.value * 100)} 
                    className="p-2 mb-4 border border-gray-300 rounded-lg w-full"
                />
            </label>
            <CardElement className="p-4 mb-4 border border-gray-300 rounded-lg" />
            <button 
                type="submit" 
                disabled={!stripe || isLoading} 
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
                {isLoading ? 'Processing...' : 'Pay Now'}
            </button>
            {message && <p className="mt-4 text-center">{message}</p>}
        </form>
    );
};

export default CheckoutForm;
