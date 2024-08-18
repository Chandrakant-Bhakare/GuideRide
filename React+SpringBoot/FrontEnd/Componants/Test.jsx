import React, { useEffect } from 'react';

const RazorpayTest = () => {

  useEffect(() => {
    // Dynamically load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_eIr8P7YioWEitG", // Replace with your Razorpay Test Key ID
      amount: "50000", // Amount in paise (50000 paise = 500 INR)
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",// Replace with your logo URL
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        // Here you can call your backend API to validate the payment
      },
      prefill: {
        name: "Test User",
        email: "testuser@example.com",
        contact: "9921136958"
      },
      notes: {
        address: "Test Address"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h2>Razorpay Payment Test</h2>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default RazorpayTest;
