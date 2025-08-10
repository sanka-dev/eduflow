"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Send, CheckCircle } from "lucide-react";

interface EnrollmentInquiryFormProps {
  courseTitle?: string;
  courseId?: string;
}

export function EnrollmentInquiryForm({ courseTitle, courseId }: EnrollmentInquiryFormProps) {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.fullName || "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    course: courseTitle || "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Import the server action dynamically
      const { submitEnrollmentInquiry } = await import("@/app/actions/submitEnrollmentInquiry");
      
      const result = await submitEnrollmentInquiry({
        name: formData.name,
        email: formData.email,
        course: formData.course,
        message: formData.message,
        courseId,
      });

      if (result.success) {
        setIsSubmitted(true);
      } else {
        console.error("Failed to submit inquiry:", result.error);
        // You could show an error message to the user here
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          Inquiry Sent Successfully!
        </h3>
        <p className="text-green-700">
          Thank you for your interest. We&apos;ll contact you within 24 hours to discuss enrollment details.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Enrollment Inquiry</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
            Course of Interest
          </label>
          <input
            type="text"
            id="course"
            required
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message (Optional)
          </label>
          <textarea
            id="message"
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Any questions or specific requirements..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {isSubmitting ? "Sending..." : "Send Inquiry"}
        </button>
      </form>
    </div>
  );
}
