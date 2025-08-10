"use server";

import { completeLessonById } from "@/sanity/lib/lessons/completeLessonById";
import { revalidatePath } from "next/cache";

export async function completeLessonAction(lessonId: string, clerkId: string) {
  try {
    if (!lessonId || !clerkId) {
      throw new Error("Missing required parameters: lessonId and clerkId");
    }

    const completion = await completeLessonById({
      lessonId,
      clerkId,
    });

    // Revalidate relevant paths to update UI
    revalidatePath("/my-courses");
    revalidatePath("/dashboard/courses");
    revalidatePath("/dashboard");

    return completion;
  } catch (error) {
    console.error("Error in completeLessonAction:", error);
    throw error;
  }
}
