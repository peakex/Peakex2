import React from 'react';
import { FadeIn } from './FadeIn';

export function Ticker() {
  const items = [
    "BUILD IN PUBLIC", "SHIP OR GO HOME", "30-DAY SPRINTS", "DEMO DAY READY",
    "ZERO EXCUSES", "BASE 01: DELHI NCR", "ELITE FOUNDERS ONLY", "PEAK PERFORMANCE"
  ];
  
  // Double to loop seamlessly
  const allItems = [...items, ...items];

  return (
    <FadeIn delay={0.8} className="ticker-wrap">
      <div className="ticker">
        {allItems.map((text, i) => (
          <span key={i} className="titem"><em>◆</em> {text}</span>
        ))}
      </div>
    </FadeIn>
  );
}
