import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-8 mb-6">
            <XCircle className="w-16 h-16 text-yellow-600 dark:text-yellow-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
              Payment Cancelled
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Your payment was cancelled. No charges were made to your account.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-black/90 transition-all duration-300"
            >
              Browse Courses
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-white dark:bg-gray-800 text-black dark:text-white border-2 border-black dark:border-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
