import { ComponentPropsWithoutRef } from "react";

export const DartIcon = ({
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
        <linearGradient id="dart-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D2FF" />
          <stop offset="100%" stopColor="#0075BA" />
        </linearGradient>
        <linearGradient id="dart-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00BBCA" />
          <stop offset="100%" stopColor="#0068B4" />
        </linearGradient>
      </defs>
      <path
        d="M34.6 5.1L5.4 34.4c-1.9 1.9-1.9 5 0 6.9L38 73.9l49.4-49.4L59.8 5.1c-1.9-1.9-5.2-2-7.2-.2L34.6 5.1z"
        fill="url(#dart-grad1)"
      />
      <path
        d="M38 73.9L5.4 106.5c-1.9 1.9-1.9 5 0 6.9l15.3 15.3c1.9 1.9 5 1.9 6.9 0l32.6-32.6L38 73.9z"
        fill="url(#dart-grad2)"
      />
      <path
        d="M87.4 24.5L60.2 96.1l32.6 32.6c1.9 1.9 5 1.9 6.9 0l29.2-29.2c1.9-1.9 1.9-5 0-6.9L87.4 24.5z"
        fill="url(#dart-grad1)"
      />
    </svg>
  );
};
