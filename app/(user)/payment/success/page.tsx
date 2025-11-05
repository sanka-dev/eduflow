import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { manualEnrollAction } from "@/app/actions/manualEnrollAction";
import getCourseById from "@/sanity/lib/courses/getCourseById";

interface PaymentSuccessPageProps {
  searchParams: Promise<{
    orderId?: string;
    courseId?: string;
  }>;
}

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const { userId } = await auth();
  const params = await searchParams;

  if (!userId) {
    redirect("/");
  }

  const orderId = params.orderId;
  const courseId = params.courseId;

  if (!orderId || !courseId) {
    redirect("/");
  }

  // Get course details
  const course = await getCourseById(courseId);

  if (!course) {
    redirect("/");
  }

  // Enroll the user in the course
  const enrollmentResult = await manualEnrollAction({
    clerkId: userId,
    courseId: courseId,
    amount: course.price || 0,
    paymentMethod: "PayHere",
    paymentReference: orderId,
    paymentDate: new Date().toISOString(),
    verifiedBy: "PayHere Gateway",
  });

  if (!enrollmentResult.success) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-8 mb-6">
              <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
                Enrollment Failed
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Payment was successful but enrollment failed. Please contact
                support.
              </p>
              <p className="text-sm text-muted-foreground">
                Order ID: {orderId}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-black/90 transition-all duration-300"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-8 mb-6">
            <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
              Payment Successful!
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              You have been successfully enrolled in <strong>{course.title}</strong>
            </p>
            <div className="bg-card rounded-lg p-4 border border-border text-left">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Order ID:</strong> {orderId}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Amount Paid:</strong> Rs. {course.price?.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/dashboard/courses/${courseId}`}
              className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-black/90 transition-all duration-300"
            >
              Start Learning
            </Link>
            <Link
              href="/my-courses"
              className="inline-block bg-white dark:bg-gray-800 text-black dark:text-white border-2 border-black dark:border-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              View My Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
