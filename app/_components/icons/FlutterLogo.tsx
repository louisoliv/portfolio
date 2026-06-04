import { ComponentPropsWithoutRef } from "react";

export const FlutterIcon = ({
  size = 24,
  ...props
}: ComponentPropsWithoutRef<"svg"> & { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="fl-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#54C5F8" />
          <stop offset="100%" stopColor="#01579B" />
        </linearGradient>
        <linearGradient id="fl-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#29B6F6" />
          <stop offset="100%" stopColor="#0288D1" />
        </linearGradient>
      </defs>
      {/* Left arrow shape */}
      <path d="M14.9 72.5L44.2 43.2h39.2L52.1 74.5z" fill="url(#fl-grad1)" />
      {/* Top chevron */}
      <path
        d="M44.2 43.2L83.4 4H44.2L5 43.2h39.2z"
        fill="url(#fl-grad1)"
        opacity="0.9"
      />
      {/* Bottom right shape */}
      <path
        d="M52.1 74.5l-17.5 17.5 17.5 17.5H83.4L65.9 92l17.5-17.5z"
        fill="url(#fl-grad2)"
      />
      {/* Dark triangle */}
      <path
        d="M34.6 92L52.1 74.5 34.6 57l-17.5 17.5z"
        fill="#0175C2"
        opacity="0.8"
      />
    </svg>
  );
};
