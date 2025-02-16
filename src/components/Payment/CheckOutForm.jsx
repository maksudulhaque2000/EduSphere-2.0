import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({ classData }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", classData).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, classData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "Anonymous",
            name: user?.displayName || "Anonymous",
          },
        },
      });

    if (confirmError) {
      toast.error(`Payment confirmation error: ${confirmError.message}`);
      setError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `You have successfully paid $${classData?.price}.`,
          confirmButtonText: "OK",
        });

        const payment = {
          email: user?.email,
          name: user?.displayName,
          id: classData?._id,
          title: classData?.title,
          description: classData?.description,
          price: classData?.price,
          image: classData?.image,
          instructorName: classData?.name,
          instructorEmail: classData?.email,
          date: new Date(),
          tranSaction: paymentIntent.id,
        };

        axiosSecure.post("/payment", payment);
        navigate("/dashboard/myenrollclass");
      }
      setError("");
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-lg shadow-lg p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
        Complete Your Payment
      </h2>
      <p className="text-center text-gray-700 mb-6">
        Please enter your card details below to complete the payment for
        <span className="font-semibold text-purple-700">
          {" "}
          {classData?.title}
        </span>
        .
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement
          id="my-card"
          options={{
            iconStyle: "solid",
            style: {
              base: {
                iconColor: "#6b7280",
                color: "#1a1a1a",
                fontSize: "16px",
                "::placeholder": {
                  color: "#a3a3a3",
                },
              },
              invalid: {
                iconColor: "#dc2626",
                color: "#dc2626",
              },
            },
          }}
          className="p-3 border rounded-md shadow-sm bg-white"
        />
        <button
          disabled={!stripe || !clientSecret}
          type="submit"
          className="w-full py-2 text-white font-bold bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 rounded-md shadow-lg"
        >
          Pay Now
        </button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {transactionId && (
          <p className="text-green-600 text-sm text-center font-semibold">
            Your Transaction Id: <span>{transactionId}</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckOutForm;
