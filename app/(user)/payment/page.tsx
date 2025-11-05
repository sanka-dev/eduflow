import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import getCourseById from "@/sanity/lib/courses/getCourseById";
import PaymentForm from "@/components/PaymentForm";

interface PaymentPageProps {
  searchParams: Promise<{
    courseId?: string;
    amount?: string;
  }>;
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const { userId } = await auth();
  const params = await searchParams;

  if (!userId) {
    redirect("/");
  }

  const courseId = params.courseId;
  const amount = params.amount ? parseFloat(params.amount) : 0;

  if (!courseId || !amount) {
    redirect("/");
  }

  const course = await getCourseById(courseId);

  if (!course) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Complete Your Enrollment</h1>
          
          <div className="bg-card rounded-lg p-6 mb-8 border border-border">
            <h2 className="text-xl font-semibold mb-4">Course Details</h2>
            <div className="space-y-2">
              <p><strong>Course:</strong> {course.title}</p>
              <p><strong>Amount:</strong> Rs. {amount.toLocaleString()}</p>
            </div>
          </div>

          <PaymentForm
            courseId={courseId}
            courseName={course.title || "Course"}
            amount={amount}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
}
