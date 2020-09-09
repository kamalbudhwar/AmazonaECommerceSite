import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { savePayment } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
function PaymentScreen(props) {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");
  const { payment } = useSelector((state) => state.cart);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({paymentMethod}));
    props.history.push('placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>
            <li>
              <input type="radio" name="paymentMethod" id="paymentMethod"  value="Paypal" onChange={(e) => setPaymentMethod(e.target.value)} autoComplete="Enter your paymentMethod"></input>
              <label htmlFor="paymentMethod">Payment Method</label>
            </li>
            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default PaymentScreen;
