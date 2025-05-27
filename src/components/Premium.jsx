import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium === true) {
      setIsUserPremium(true);
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    // Options
    // Open Razorpay Checkout
    const options = {
      key: keyId,
      amount,
      currency,
      name: "Code Mate",
      description: "Connect With Other Developers",
      order_id: orderId,

      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    // It Should Open Razorpay Dialog box
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return isUserPremium ? (
    "You Are Already a Premium Member"
  ) : (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold  text-3xl"> Silver Membership </h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection request per day </li>
            <li> - Blue Tick</li>
            <li> - 3 Months</li>
          </ul>
          <button
            className="btn btn-secondary"
            onClick={() => handleBuyClick("silver")}
          >
            Buy Silver{" "}
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold  text-3xl"> Gold Membership </h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - Infinite connection request per day </li>
            <li> - Blue Tick</li>
            <li> - 6 Months</li>
          </ul>
          <button
            className="btn btn-primary"
            onClick={() => handleBuyClick("gold")}
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
