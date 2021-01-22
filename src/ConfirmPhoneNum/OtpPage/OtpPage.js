import React, { useState } from "react";
import "./OtpPage.css";
import { Link } from "react-router-dom";

function OtpPage() {
  const [Otp, setOpt] = useState(new Array(4).fill(""));

  const handlerChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOpt([...Otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  return (
    <div className="otpPage">
      <h2>Confirm your phone number</h2>
      <h4>Enter the code you received from via sms</h4>
      {Otp.map((data, index) => {
        return (
          <input
            type="text"
            maxLength="1"
            name="otp"
            key={index}
            value={data}
            onChange={(e) => handlerChange(e.target, index)}
            onFocus={(e) => e.target.select()}
          />
        );
      })}
      <h4>A code has been dent to hte phone number you entered via sms</h4>
      <Link to="/Schedule">
        <div className="otpPage__button">
          <button>Confirm</button>
        </div>
      </Link>
    </div>
  );
}

export default OtpPage;
