"use server";

import { uncompleteLessonById } from "@/sanity/lib/lessons/uncompleteLessonById";
import { revalidatePath } from "next/cache";

export async function uncompleteLessonAction(lessonId: string, clerkId: string) {
  try {
    if (!lessonId || !clerkId) {
      throw new Error("Missing required parameters: lessonId and clerkId");
    }

    await uncompleteLessonById({
      lessonId,
      clerkId,
    });

    // Revalidate relevant paths to update UI
    revalidatePath("/my-courses");
    revalidatePath("/dashboard/courses");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error in uncompleteLessonAction:", error);
    throw error;
  }
}
