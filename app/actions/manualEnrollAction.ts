"use server";

import { createManualEnrollment } from "@/sanity/lib/student/createManualEnrollment";
import { revalidatePath } from "next/cache";

interface ManualEnrollParams {
  clerkId: string;
  courseId: string;
  amount?: number;
  paymentMethod?: string;
  paymentReference?: string;
  paymentDate?: string;
  paymentNotes?: string;
  verifiedBy?: string;
}

export async function manualEnrollAction({
  clerkId,
  courseId,
  amount,
  paymentMethod,
  paymentReference,
  paymentDate,
  paymentNotes,
  verifiedBy,
}: ManualEnrollParams) {
  try {
    if (!clerkId || !courseId) {
      throw new Error("Missing required parameters: clerkId and courseId");
    }

    const enrollment = await createManualEnrollment({
      clerkId,
      courseId,
      amount,
      paymentMethod,
      paymentReference,
      paymentDate,
      paymentNotes,
      verifiedBy,
    });

    // Revalidate relevant paths to update UI
    revalidatePath("/my-courses");
    revalidatePath(`/courses/${courseId}`);
    revalidatePath("/dashboard");

    return {
      success: true,
      enrollment,
    };
  } catch (error) {
    console.error("Error in manualEnrollAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
