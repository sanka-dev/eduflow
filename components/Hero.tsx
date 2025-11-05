'use client';

import dynamic from 'next/dynamic';

const Galaxy = dynamic(() => import('./Galaxy'), { ssr: false });

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Galaxy Background Animation */}
      <div className="absolute inset-0">
        <Galaxy 
          focal={[0.5, 0.5]}
          rotation={[1.0, 0.0]}
          starSpeed={0.01}
          density={2.2}
          hueShift={0}
          disableAnimation={false}
          speed={1.0}
          mouseInteraction={true}
          glowIntensity={0.3}
          saturation={0.0}
          mouseRepulsion={true}
          repulsionStrength={2}
          twinkleIntensity={0.5}
          rotationSpeed={0.1}
          autoCenterRepulsion={0}
          transparent={true}
        />
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/5  dark:to-black/4" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/" />

      <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
            Expand Your Knowledge with Our <span style={{ fontFamily: "'Charm', cursive" }}>Courses</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover a world of learning with our expertly crafted courses.
            Learn from industry professionals and take your skills to the next
            level.
          </p>
        </div>
      </div>
    </div>
  );
}
