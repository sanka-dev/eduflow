"use server";

import { getLessonCompletionStatus } from "@/sanity/lib/lessons/getLessonCompletionStatus";

export async function getLessonCompletionStatusAction(lessonId: string, clerkId: string) {
  try {
    if (!lessonId || !clerkId) {
      throw new Error("Missing required parameters: lessonId and clerkId");
    }

    const isCompleted = await getLessonCompletionStatus(lessonId, clerkId);

    return isCompleted;
  } catch (error) {
    console.error("Error in getLessonCompletionStatusAction:", error);
    throw error;
  }
}
