import { createEnrollment } from "./createEnrollment";
import { createStudentIfNotExists } from "./createStudentIfNotExists";

interface CreateManualEnrollmentParams {
  clerkId: string;
  courseId: string;
  amount?: number;
  paymentMethod?: string;
  paymentReference?: string;
  paymentDate?: string;
  paymentNotes?: string;
  verifiedBy?: string;
}

export async function createManualEnrollment({
  clerkId,
  courseId,
  amount = 0,
  paymentMethod = "free",
  paymentReference,
  paymentDate,
  paymentNotes,
  verifiedBy = "System",
}: CreateManualEnrollmentParams) {
  // For manual enrollment, we need to get student by clerkId first
  // If student doesn't exist, this should be handled by the admin interface
  const { getStudentByClerkId } = await import("./getStudentByClerkId");
  const studentResult = await getStudentByClerkId(clerkId);
  
  if (!studentResult?.data?._id) {
    throw new Error("Student not found. Please ensure the user has signed in at least once or create the student record manually.");
  }

  // Create enrollment with enhanced payment tracking
  return createEnrollment({
    studentId: studentResult.data._id,
    courseId,
    amount,
    paymentMethod,
    paymentReference,
    paymentDate,
    paymentNotes,
    verifiedBy,
  });
}
