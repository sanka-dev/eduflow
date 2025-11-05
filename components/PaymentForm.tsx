"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PaymentFormProps {
  courseId: string;
  courseName: string;
  amount: number;
  userId: string;
}

declare global {
  interface Window {
    payhere: {
      startPayment: (payment: PayHerePayment) => void;
      onCompleted: (orderId: string) => void;
      onDismissed: () => void;
      onError: (error: string) => void;
    };
  }
}

interface PayHerePayment {
  sandbox: boolean;
  merchant_id: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  order_id: string;
  items: string;
  amount: string;
  currency: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  hash?: string;
}

export default function PaymentForm({
  courseId,
  courseName,
  amount,
  userId,
}: PaymentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    // Load PayHere script
    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate order ID
      const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // PayHere payment object for sandbox
      const payment: PayHerePayment = {
        sandbox: true, // Set to false for production
        merchant_id: process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID || "1228024", // Sandbox merchant ID
        return_url: `${window.location.origin}/payment/success?orderId=${orderId}&courseId=${courseId}`,
        cancel_url: `${window.location.origin}/payment/cancel`,
        notify_url: `${window.location.origin}/api/payment/notify`,
        order_id: orderId,
        items: courseName,
        amount: amount.toFixed(2),
        currency: "LKR",
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: "Sri Lanka",
      };

      // PayHere callbacks
      window.payhere.onCompleted = function onCompleted(orderId: string) {
        console.log("Payment completed. OrderID:" + orderId);
        router.push(`/payment/success?orderId=${orderId}&courseId=${courseId}`);
      };

      window.payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed");
        setIsLoading(false);
      };

      window.payhere.onError = function onError(error: string) {
        console.log("Error:" + error);
        alert("Payment error: " + error);
        setIsLoading(false);
      };

      // Start payment
      window.payhere.startPayment(payment);
    } catch (error) {
      console.error("Payment initialization error:", error);
      alert("Failed to initialize payment. Please try again.");
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="07XXXXXXXX"
            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-2">
            Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium mb-2">
            City *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-black/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : `Pay Rs. ${amount.toLocaleString()}`}
          </button>
        </div>

        <div className="text-sm text-muted-foreground text-center">
          <p>🔒 Secure payment powered by PayHere</p>
          <p className="text-xs mt-1">This is a sandbox environment for testing</p>
        </div>
      </form>
    </div>
  );
}
