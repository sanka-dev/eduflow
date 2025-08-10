"use client";

import { useUser } from "@clerk/nextjs";
import { CheckCircle, Mail, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

function EnrollButton({
  courseId,
  isEnrolled,
}: {
  courseId: string;
  isEnrolled: boolean;
}) {
  const { user, isLoaded: isUserLoaded } = useUser();

  // Show loading state while checking user is loading
  if (!isUserLoaded) {
    return (
      <div className="w-full h-12 rounded-lg bg-gray-100 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
      </div>
    );
  }

  // Show enrolled state with link to course
  if (isEnrolled) {
    return (
      <Link
        prefetch={false}
        href={`/dashboard/courses/${courseId}`}
        className="w-full rounded-lg px-6 py-3 font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 h-12 flex items-center justify-center gap-2 group"
      >
        <span>Access Course</span>
        <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </Link>
    );
  }

  // Show contact admin message for enrollment
  return (
    <div className="w-full space-y-4">
      <div className="w-full rounded-lg px-6 py-3 font-medium bg-gradient-to-r from-blue-500 to-indigo-500 text-white h-12 flex items-center justify-center gap-2">
        <Mail className="w-5 h-5" />
        <span>Contact for Enrollment</span>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
        <p className="font-medium text-gray-900">Ready to enroll? Contact us:</p>
        <div className="space-y-2 text-gray-700">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-500" />
            <a href="mailto:enrollment@yourschool.com" className="hover:text-blue-600 transition-colors">
              enrollment@yourschool.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-green-500" />
            <a href="tel:+1234567890" className="hover:text-green-600 transition-colors">
              (123) 456-7890
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-purple-500" />
            <Link href="/contact" className="hover:text-purple-600 transition-colors">
              Send inquiry form
            </Link>
          </div>
        </div>
        {user?.id && (
          <p className="text-xs text-gray-600 mt-2">
            Your account: {user.emailAddresses[0]?.emailAddress}
          </p>
        )}
      </div>
    </div>
  );
}

export default EnrollButton;
