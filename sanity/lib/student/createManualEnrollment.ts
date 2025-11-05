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
  const { getStudentByClerkId } = await import("./getStudentByClerkId");
  let studentResult = await getStudentByClerkId(clerkId);
  
  // If student doesn't exist, create them first
  if (!studentResult?.data?._id) {
    console.log("Student not found, creating new student record for clerkId:", clerkId);
    
    // Get user info from Clerk to create student
    const { clerkClient } = await import("@clerk/nextjs/server");
    const client = await clerkClient();
    const user = await client.users.getUser(clerkId);
    
    const newStudent = await createStudentIfNotExists({
      clerkId: clerkId,
      email: user.emailAddresses[0]?.emailAddress || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      imageUrl: user.imageUrl || "",
    });
    
    // Get the student again to ensure we have the correct format
    studentResult = await getStudentByClerkId(clerkId);
    
    if (!studentResult?.data?._id) {
      throw new Error("Failed to create student record");
    }
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
