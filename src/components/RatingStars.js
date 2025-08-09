// src/components/RatingStars.js
import { useMemo } from "react";

export default function RatingStars({ value=0, onChange, size=18 }) {
  const stars = useMemo(() => {
    const full = Math.floor(value);
    const half = value - full >= 0.5;
    return { full, half };
  }, [value]);

  const base = { cursor: onChange ? "pointer" : "default", width:size, height:size };

  return (
    <div style={{display:"inline-flex", alignItems:"center", gap:4}}>
      {[0,1,2,3,4].map(i => {
        const filled = i < stars.full;
        const isHalf = i === stars.full && stars.half;
        const fill = filled ? "#111" : isHalf ? "url(#half)" : "#ddd";
        return (
          <svg key={i} viewBox="0 0 24 24"
               onClick={() => onChange && onChange(i+1)}
               style={base} aria-label={`${i+1} star`}>
            {isHalf && (
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="#111" />
                  <stop offset="50%" stopColor="#ddd" />
                </linearGradient>
              </defs>
            )}
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  fill={fill}/>
          </svg>
        );
      })}
    </div>
  );
}
