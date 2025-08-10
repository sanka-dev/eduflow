import { client } from "../adminClient";

interface CreateEnrollmentParams {
  studentId: string;
  courseId: string;
  paymentId?: string;
  amount?: number;
  paymentMethod?: string;
  paymentReference?: string;
  paymentDate?: string;
  paymentNotes?: string;
  verifiedBy?: string;
}

export async function createEnrollment({
  studentId,
  courseId,
  paymentId,
  amount,
  paymentMethod = "free",
  paymentReference,
  paymentDate,
  paymentNotes,
  verifiedBy,
}: CreateEnrollmentParams) {
  // Generate paymentId if not provided
  const finalPaymentId = paymentId || `manual-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  return client.create({
    _type: "enrollment",
    student: {
      _type: "reference",
      _ref: studentId,
    },
    course: {
      _type: "reference",
      _ref: courseId,
    },
    paymentId: finalPaymentId,
    amount: amount || 0,
    paymentMethod,
    ...(paymentReference && { paymentReference }),
    ...(paymentDate && { paymentDate }),
    ...(paymentNotes && { paymentNotes }),
    ...(verifiedBy && { verifiedBy }),
    enrolledAt: new Date().toISOString(),
  });
}
