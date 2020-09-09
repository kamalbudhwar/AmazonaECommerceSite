import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveShipping } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen(props) {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { shipping } = useSelector((state) => state.cart);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({address, city, country, postalCode}));
    props.history.push('payment');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 />
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Shipping</h2>
            </li>
            <li>
              <label htmlFor="address">Address</label>
              <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)} autoComplete="Enter your address"></input>
            </li>
            <li>
              <label htmlFor="city">City</label>
              <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)} autoComplete="Enter city name"></input>
            </li>
            <li>
              <label htmlFor="postalCode">Postal Code</label>
              <input type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)} autoComplete="Enter postalCode"></input>
            </li>
            <li>
              <label htmlFor="country">Country</label>
              <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)} autoComplete="Enter country name"></input>
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
export default ShippingScreen;
