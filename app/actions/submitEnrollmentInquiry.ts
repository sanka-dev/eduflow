"use server";

import { revalidatePath } from "next/cache";

interface EnrollmentInquiryData {
  name: string;
  email: string;
  course: string;
  message: string;
  courseId?: string;
}

export async function submitEnrollmentInquiry(data: EnrollmentInquiryData) {
  try {
    // Validate the data
    if (!data.name || !data.email || !data.course) {
      throw new Error("Missing required fields");
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification to admin
    // 3. Send confirmation email to user
    
    // For now, we'll just log the inquiry
    console.log("New enrollment inquiry:", {
      name: data.name,
      email: data.email,
      course: data.course,
      message: data.message,
      courseId: data.courseId,
      timestamp: new Date().toISOString(),
    });

    // In a real implementation, you might:
    // - Store in Sanity CMS as an "inquiry" document
    // - Send email using a service like SendGrid, Resend, or Nodemailer
    // - Integrate with a CRM system
    
    // Example with Sanity (uncomment if you want to store inquiries):
    /*
    const { client } = await import("@/sanity/lib/adminClient");
    
    const inquiry = await client.create({
      _type: "enrollmentInquiry",
      name: data.name,
      email: data.email,
      course: data.course,
      message: data.message,
      courseId: data.courseId,
      status: "new",
      submittedAt: new Date().toISOString(),
    });
    */

    // Revalidate any relevant paths
    revalidatePath("/contact");

    return {
      success: true,
      message: "Inquiry submitted successfully",
    };
  } catch (error) {
    console.error("Error submitting enrollment inquiry:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
