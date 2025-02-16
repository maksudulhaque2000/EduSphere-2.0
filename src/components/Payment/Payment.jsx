import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const location = useLocation();
  const { classData } = location.state;

  return (
    <div>
      <SectionTitle
        subTitle={"Secure Your Spot with Easy Payment"}
        heading={
          "Complete your payment securely and effortlessly to unlock exclusive access to your selected class. Our encrypted payment gateway ensures the safety of your transaction, so you can focus on learning and growing. Don't wait—confirm your enrollment today and take the first step towards achieving your goals!"
        }
      ></SectionTitle>
      <div className="my-10">
        <Elements stripe={stripePromise}>
          <CheckOutForm classData={classData}></CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
