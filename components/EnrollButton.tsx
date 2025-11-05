"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { manualEnrollAction } from "@/app/actions/manualEnrollAction";

function EnrollButton({
  courseId,
  isEnrolled,
  price,
}: {
  courseId: string;
  isEnrolled: boolean;
  price?: number;
}) {
  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const isFree = !price || price === 0;

  // Handle free course enrollment
  const handleFreeEnrollment = async () => {
    if (!user) {
      // This should not be called if user is not logged in
      // The SignInButton will handle the sign-in flow
      return;
    }

    setIsEnrolling(true);
    try {
      const result = await manualEnrollAction({
        clerkId: user.id,
        courseId: courseId,
        amount: 0,
        paymentMethod: "FREE",
        paymentReference: "FREE-AUTO-ENROLL",
        verifiedBy: "System",
      });

      if (result.success) {
        router.refresh();
      } else {
        console.error("Enrollment failed:", result.error);
        alert(`Failed to enroll: ${result.error || "Unknown error. Please try again."}`);
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      alert(`Failed to enroll in course: ${errorMessage}`);
    } finally {
      setIsEnrolling(false);
    }
  };

  // Show loading state while checking user is loading
  if (!isUserLoaded || isEnrolling) {
    return (
      <div className="inline-flex items-center justify-center rounded-lg px-8 py-4 bg-gray-100 text-gray-600">
        <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin mr-2" />
        <span>{isEnrolling ? "Enrolling..." : "Loading..."}</span>
      </div>
    );
  }

  // Show enrolled state with link to course
  if (isEnrolled) {
    return (
      <Link
        prefetch={false}
        href={`/dashboard/courses/${courseId}`}
        className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 text-lg group"
      >
        <span>Access Course</span>
        <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </Link>
    );
  }

  // Free course - show enroll button or sign in button
  if (isFree) {
    if (user) {
      // User is logged in, show enroll button
      return (
        <button
          onClick={handleFreeEnrollment}
          disabled={isEnrolling}
          className="inline-block rounded-lg px-8 py-4 font-semibold bg-black text-white hover:bg-black/90 transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEnrolling ? "Enrolling..." : "Enroll for Free"}
        </button>
      );
    } else {
      // User not logged in, show sign in button with Clerk modal
      return (
        <SignInButton mode="modal">
          <button className="inline-block rounded-lg px-8 py-4 font-semibold bg-black text-white hover:bg-black/90 transition-all duration-300 text-lg border-2 border-white/20">
            Sign In to Enroll
          </button>
        </SignInButton>
      );
    }
  }

  // Paid course - show enroll button that redirects to payment
  const handlePaidEnrollment = () => {
    if (!user) {
      // Redirect to sign in if not logged in
      return;
    }
    
    // Redirect to payment page with course info
    router.push(`/payment?courseId=${courseId}&amount=${price}`);
  };

  if (user) {
    // Logged in user - show payment button
    return (
      <button
        onClick={handlePaidEnrollment}
        className="inline-block rounded-lg px-8 py-4 font-semibold bg-black text-white hover:bg-black/90 transition-all duration-300 text-lg"
      >
        Enroll Now - Rs. {price?.toLocaleString()}
      </button>
    );
  } else {
    // Not logged in - show sign in button
    return (
      <SignInButton mode="modal">
        <button className="inline-block rounded-lg px-8 py-4 font-semibold bg-black text-white hover:bg-black/90 transition-all duration-300 text-lg border-2 border-white/20">
          Sign In to Enroll
        </button>
      </SignInButton>
    );
  }
}

export default EnrollButton;
