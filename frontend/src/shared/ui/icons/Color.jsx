import React from "react";

export function Color({ color = "white", width = "16", height = "16" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <rect x="2" y="2" width="12" height="12" rx="4" fill={color} />
    </svg>
  );
}
