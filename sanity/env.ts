export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-30";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET or SANITY_STUDIO_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.SANITY_STUDIO_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_STUDIO_PROJECT_ID"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    console.error(`❌ ${errorMessage}`);
    console.log('📝 Please check your .env.local file and follow the setup guide in ENVIRONMENT_SETUP.md');
    
    // In development, provide helpful guidance instead of crashing
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 Using placeholder values for development. Replace with actual values to access Sanity Studio.');
      return (v as any) || 'placeholder-value';
    }
    
    throw new Error(errorMessage);
  }

  return v;
}
