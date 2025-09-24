import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../zustand/store";
import Navigation from "../component/navigation";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaMobile,
  FaUniversity,
  FaCheckCircle,
} from "react-icons/fa";

export default function CheckOut() {
  const navigate = useNavigate();
  const { cart, setCart } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [receivedAmount, setReceivedAmount] = useState("");
  const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
  const [payerAccountNumber, setPayerAccountNumber] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [receiverAccounts, setReceiverAccounts] = useState([]);
  const [selectedReceiverAccount, setSelectedReceiverAccount] = useState(null);

  // Calculate total amount
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.shoe.Price * item.quantity,
      0
    );
  };

  // Fetch receiver accounts
  const fetchReceiverAccounts = async (paymentMethod) => {
    try {
      const response = await fetch(`/api/receiver-accounts/${paymentMethod}`);
      const result = await response.json();
      if (result.success) {
        setReceiverAccounts(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch receiver accounts:", error);
    }
  };

  // Step management
  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  // Handle payment method selection
  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setSelectedReceiverAccount(null);
    fetchReceiverAccounts(method);
    nextStep();
  };

  // Handle receiver account selection
  const handleReceiverAccountSelect = (account) => {
    setSelectedReceiverAccount(account);
    setReceiverAccountNumber(account.accountNumber);
    nextStep();
  };

  const handlePaymentVerification = async () => {
    if (
      !selectedPaymentMethod ||
      !referenceId ||
      !receivedAmount ||
      !receiverAccountNumber
    ) {
      setError("Please fill all payment verification fields");
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const response = await fetch(`/api/verify/${selectedPaymentMethod}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referenceId,
          receivedAmount,
          receiverName: "KASMA SHOES",
          receiverAccountNumber,
          payerAccountNumber: payerAccountNumber || "none",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setVerificationStatus("verified");
        setError(null);
        nextStep(); // Move to final step after verification
      } else {
        setError(result.message || "Payment verification failed");
        setVerificationStatus("failed");
      }
    } catch {
      setError("Payment verification failed. Please try again.");
      setVerificationStatus("failed");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!name || !phone || !address) {
      setError("Please fill all the fields");
      setIsLoading(false);
      return;
    }

    if (!selectedPaymentMethod) {
      setError("Please select a payment method");
      setIsLoading(false);
      return;
    }

    if (verificationStatus !== "verified") {
      setError("Please verify your payment first");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/order/sendToBot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          address,
          data: cart,
          paymentMethod: selectedPaymentMethod,
          referenceId,
          receivedAmount,
          receiverAccountNumber,
          payerAccountNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong with the submission");
      }

      // Clear form fields and cart
      setName("");
      setPhone("");
      setAddress("");
      setCart([]);
      setSelectedPaymentMethod("");
      setReferenceId("");
      setReceivedAmount("");
      setReceiverAccountNumber("");
      setPayerAccountNumber("");
      setVerificationStatus(null);

      // Navigate to success page after successful submission
      navigate("/success", {
        state: {
          name: name,
          phone: phone,
          address: address,
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const paymentMethods = [
    {
      id: "cbe",
      name: "Commercial Bank of Ethiopia",
      icon: <FaUniversity className="text-2xl" />,
      color: "from-blue-600 to-blue-800",
      description: "Bank Transfer",
    },
    {
      id: "cbebirr",
      name: "CBEBirr",
      icon: <FaMobile className="text-2xl" />,
      color: "from-green-600 to-green-800",
      description: "Mobile Payment",
    },
    {
      id: "boa",
      name: "Bank of Abyssinia",
      icon: <FaUniversity className="text-2xl" />,
      color: "from-purple-600 to-purple-800",
      description: "Bank Transfer",
    },
    {
      id: "telebirr",
      name: "Telebirr",
      icon: <FaMobile className="text-2xl" />,
      color: "from-orange-600 to-orange-800",
      description: "Mobile Payment",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-gradient overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold-500/10 via-transparent to-red-500/10"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 border-b border-gold-500/20">
        <div className="absolute inset-0 bg-luxury-gradient opacity-5"></div>
        <div className="relative flex justify-between px-6 py-4 items-center">
          <button
            onClick={() => navigate(-1)}
            className="group p-3 rounded-2xl bg-dark-800/50 backdrop-blur-sm border border-gold-500/20 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 hover:scale-105"
          >
            <FaArrowLeft className="text-xl text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-bold gradient-text">Checkout</h1>
            <p className="text-sm text-dark-300 mt-1">Complete Your Order</p>
          </div>

          <Link
            to={"/cart"}
            className="group relative p-3 rounded-2xl bg-dark-800/50 backdrop-blur-sm border border-gold-500/20 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 hover:scale-105"
          >
            <FaShoppingCart className="text-xl text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
            {cart.length > 0 && (
              <div className="absolute -top-1 -right-1 text-[10px] text-center w-5 h-5 flex items-center justify-center rounded-full text-white bg-gradient-to-r from-red-500 to-red-600 shadow-lg animate-pulse-gold">
                {cart.length}
              </div>
            )}
          </Link>
        </div>
      </div>

      <div className="relative z-10 flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <button
                    onClick={() => goToStep(step)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      currentStep >= step
                        ? "bg-gold-500 text-white shadow-luxury"
                        : "bg-dark-700 text-dark-400 border border-gold-500/30"
                    }`}
                  >
                    {step}
                  </button>
                  {step < 5 && (
                    <div
                      className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                        currentStep > step ? "bg-gold-500" : "bg-dark-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-12">
              <span
                className={`text-sm ${
                  currentStep >= 1 ? "text-gold-400" : "text-dark-500"
                }`}
              >
                Personal Info
              </span>
              <span
                className={`text-sm ${
                  currentStep >= 2 ? "text-gold-400" : "text-dark-500"
                }`}
              >
                Payment Method
              </span>
              <span
                className={`text-sm ${
                  currentStep >= 3 ? "text-gold-400" : "text-dark-500"
                }`}
              >
                Select Account
              </span>
              <span
                className={`text-sm ${
                  currentStep >= 4 ? "text-gold-400" : "text-dark-500"
                }`}
              >
                Payment Details
              </span>
              <span
                className={`text-sm ${
                  currentStep >= 5 ? "text-gold-400" : "text-dark-500"
                }`}
              >
                Verification
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary - Always Visible */}
            <div className="lg:col-span-1">
              <div className="bg-dark-800/50 backdrop-blur-sm border border-gold-500/20 rounded-2xl p-6 shadow-luxury sticky top-6">
                <h2 className="text-xl font-bold text-gold-400 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"></div>
                  Order Summary
                </h2>
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-3 bg-dark-700/50 rounded-xl"
                    >
                      <img
                        src={item.shoe.imgUrl[0]}
                        alt={item.shoe.shoes_name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-dark-200 font-medium">
                          {item.shoe.shoes_name}
                        </h3>
                        <p className="text-sm text-dark-400">
                          Size: {item.selectedSize}
                        </p>
                        <p className="text-sm text-dark-400">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-gold-400 font-bold">
                        ETB {item.shoe.Price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gold-500/20 pt-4 mt-4">
                  <div className="flex justify-between items-center text-xl font-bold text-gold-400">
                    <span>Total:</span>
                    <span>ETB {calculateTotal()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step Content */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-gold-500/20 rounded-2xl p-6 shadow-luxury">
                    <h2 className="text-2xl font-bold text-gold-400 mb-6 flex items-center gap-2">
                      <div className="w-1 h-8 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"></div>
                      Personal Information
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-gold-300 mb-2 font-medium text-lg">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-4 bg-dark-700 border border-gold-500/30 rounded-xl text-dark-100 placeholder-dark-400 focus:outline-none focus:border-gold-400 transition-colors duration-300 text-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gold-300 mb-2 font-medium text-lg">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter your phone number"
                          className="w-full px-4 py-4 bg-dark-700 border border-gold-500/30 rounded-xl text-dark-100 placeholder-dark-400 focus:outline-none focus:border-gold-400 transition-colors duration-300 text-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gold-300 mb-2 font-medium text-lg">
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter your delivery address"
                          className="w-full px-4 py-4 bg-dark-700 border border-gold-500/30 rounded-xl text-dark-100 placeholder-dark-400 focus:outline-none focus:border-gold-400 transition-colors duration-300 text-lg"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!name || !phone || !address}
                        className="w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-400 hover:to-gold-500 shadow-luxury hover:shadow-luxury-lg hover:scale-105 disabled:bg-dark-600 disabled:text-dark-400 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Method Selection */}
                {currentStep === 2 && (
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-gold-500/20 rounded-2xl p-6 shadow-luxury">
                    <h2 className="text-2xl font-bold text-gold-400 mb-6 flex items-center gap-2">
                      <div className="w-1 h-8 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"></div>
                      Select Payment Method
                    </h2>
                    <div className="grid grid-cols-2 gap-6">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => handlePaymentMethodSelect(method.id)}
                          className="p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 bg-dark-700/50 border-gold-500/30 hover:border-gold-400/50"
                        >
                          <div className="text-center">
                            <div className="mx-auto mb-4 text-gold-400 text-4xl">
                              {method.icon}
                            </div>
                            <h3 className="text-lg font-medium text-dark-200 mb-2">
                              {method.name}
                            </h3>
                            <p className="text-sm text-dark-400">
                              {method.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={prevStep}
                      className="mt-6 px-6 py-3 rounded-xl bg-dark-700 text-dark-300 hover:bg-dark-600 transition-colors duration-300"
                    >
                      Back to Personal Info
                    </button>
                  </div>
                )}

                {/* Step 3: Receiver Account Selection */}
                {currentStep === 3 && selectedPaymentMethod && (
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-gold-500/20 rounded-2xl p-6 shadow-luxury">
                    <h2 className="text-2xl font-bold text-gold-400 mb-6 flex items-center gap-2">
                      <div className="w-1 h-8 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"></div>
                      Select Payment Account
                    </h2>
                    <div className="space-y-4">
                      {receiverAccounts.length > 0 ? (
                        receiverAccounts.map((account) => (
                          <button
                            key={account._id}
                            type="button"
                            onClick={() => handleReceiverAccountSelect(account)}
                            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                              selectedReceiverAccount?._id === account._id
                                ? "border-gold-400 bg-gold-500/20"
                                : "border-gold-500/30 bg-dark-700/50 hover:border-gold-400/50"
                            }`}
                          >
                            <div className="text-left">
                              <h3 className="text-lg font-medium text-dark-200">
                                {account.displayName}
                              </h3>
                              <p className="text-sm text-dark-400 mt-1">
                                {account.paymentMethod === "cbe" ||
                                account.paymentMethod === "boa"
                                  ? `Account: ${account.accountNumber}`
                                  : `Phone: ${account.phoneNumber}`}
                              </p>
                              {account.description && (
                                <p className="text-xs text-dark-500 mt-2">
                                  {account.description}
                                </p>
                              )}
                              {account.instructions && (
                                <p className="text-xs text-gold-400 mt-2 font-medium">
                                  {account.instructions}
                                </p>
                              )}
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-dark-400">
                            No payment accounts available for this method
                          </p>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={prevStep}
                      className="mt-6 px-6 py-3 rounded-xl bg-dark-700 text-dark-300 hover:bg-dark-600 transition-colors duration-300"
                    >
                      Back to Payment Method
                    </button>
                  </div>
                )}

                {/* Step 4: Payment Verification */}
                {currentStep === 4 && selectedReceiverAccount && (
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-gold-500/20 rounded-2xl p-6 shadow-luxury">
                    <h2 className="text-2xl font-bold text-gold-400 mb-6 flex items-center gap-2">
                      <div className="w-1 h-8 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"></div>
                      Payment Verification
                    </h2>

                    {/* Selected Account Info */}
                    <div className="bg-gold-500/10 border border-gold-500/30 rounded-xl p-4 mb-6">
                      <h3 className="text-lg font-semibold text-gold-300 mb-2">
                        Payment Account Selected:
                      </h3>
                      <p className="text-dark-200">
                        {selectedReceiverAccount.displayName}
                      </p>
                      <p className="text-sm text-dark-400">
                        {selectedPaymentMethod === "cbe" ||
                        selectedPaymentMethod === "boa"
                          ? `Account: ${selectedReceiverAccount.accountNumber}`
                          : `Phone: ${selectedReceiverAccount.phoneNumber}`}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-gold-300 mb-2 font-medium text-lg">
                          Reference ID
                        </label>
                        <input
                          type="text"
                          value={referenceId}
                          onChange={(e) => setReferenceId(e.target.value)}
                          placeholder="Enter transaction reference ID"
                          className="w-full px-4 py-4 bg-dark-700 border border-gold-500/30 rounded-xl text-dark-100 placeholder-dark-400 focus:outline-none focus:border-gold-400 transition-colors duration-300 text-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-gold-300 mb-2 font-medium text-lg">
                          Amount Paid
                        </label>
                        <input
                          type="number"
                          value={receivedAmount}
                          onChange={(e) => setReceivedAmount(e.target.value)}
                          placeholder="Enter amount paid"
                          className="w-full px-4 py-4 bg-dark-700 border border-gold-500/30 rounded-xl text-dark-100 placeholder-dark-400 focus:outline-none focus:border-gold-400 transition-colors duration-300 text-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-gold-300 mb-2 font-medium text-lg">
                          {selectedPaymentMethod === "cbe" ||
                          selectedPaymentMethod === "boa"
                            ? "Your Account Number"
                            : "Your Phone Number"}
                        </label>
                        <input
                          type="text"
                          value={payerAccountNumber}
                          onChange={(e) =>
                            setPayerAccountNumber(e.target.value)
                          }
                          placeholder={
                            selectedPaymentMethod === "cbe" ||
                            selectedPaymentMethod === "boa"
                              ? "Enter your account number"
                              : "Enter your phone number"
                          }
                          className="w-full px-4 py-4 bg-dark-700 border border-gold-500/30 rounded-xl text-dark-100 placeholder-dark-400 focus:outline-none focus:border-gold-400 transition-colors duration-300 text-lg"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handlePaymentVerification}
                        disabled={
                          isVerifying ||
                          verificationStatus === "verified" ||
                          !referenceId ||
                          !receivedAmount
                        }
                        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                          verificationStatus === "verified"
                            ? "bg-green-600 text-white cursor-not-allowed"
                            : isVerifying
                            ? "bg-dark-600 text-dark-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-400 hover:to-gold-500 shadow-luxury hover:shadow-luxury-lg"
                        }`}
                      >
                        {isVerifying ? (
                          "Verifying Payment..."
                        ) : verificationStatus === "verified" ? (
                          <div className="flex items-center justify-center gap-2">
                            <FaCheckCircle className="text-xl" />
                            Payment Verified Successfully
                          </div>
                        ) : (
                          "Verify Payment"
                        )}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={prevStep}
                      className="mt-6 px-6 py-3 rounded-xl bg-dark-700 text-dark-300 hover:bg-dark-600 transition-colors duration-300"
                    >
                      Back to Account Selection
                    </button>
                  </div>
                )}

                {/* Step 5: Order Confirmation */}
                {currentStep === 5 && verificationStatus === "verified" && (
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-gold-500/20 rounded-2xl p-6 shadow-luxury">
                    <h2 className="text-2xl font-bold text-gold-400 mb-6 flex items-center gap-2">
                      <div className="w-1 h-8 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"></div>
                      Complete Your Order
                    </h2>

                    <div className="space-y-6">
                      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <FaCheckCircle className="text-2xl text-green-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-green-300">
                              Payment Verified!
                            </h3>
                            <p className="text-dark-300">
                              Your payment has been successfully verified.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-dark-700/50 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-gold-300 mb-3">
                          Order Summary
                        </h3>
                        <div className="space-y-2 text-dark-300">
                          <p>
                            <span className="font-medium">Customer:</span>{" "}
                            {name}
                          </p>
                          <p>
                            <span className="font-medium">Phone:</span> {phone}
                          </p>
                          <p>
                            <span className="font-medium">Address:</span>{" "}
                            {address}
                          </p>
                          <p>
                            <span className="font-medium">Payment Method:</span>{" "}
                            {selectedPaymentMethod.toUpperCase()}
                          </p>
                          <p>
                            <span className="font-medium">Reference ID:</span>{" "}
                            {referenceId}
                          </p>
                          <p>
                            <span className="font-medium">Amount Paid:</span>{" "}
                            ETB {receivedAmount}
                          </p>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                          isLoading
                            ? "bg-dark-600 text-dark-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-400 hover:to-gold-500 shadow-luxury hover:shadow-luxury-lg hover:scale-105"
                        }`}
                      >
                        {isLoading ? "Processing Order..." : "Complete Order"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-300 text-center">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
