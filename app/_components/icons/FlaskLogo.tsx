import { ComponentPropsWithoutRef } from "react";

export const FlaskIcon = ({
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
      <path
        d="M43.2 0v48.3L7.4 117.6C5.3 121.8 8.3 127 13 127h102c4.7 0 7.7-5.2 5.6-9.4L84.8 48.3V0H43.2zm8 8h25.6v42.3l.5 1 33.7 67.7H17l33.7-67.7.5-1V8z"
        fill="currentColor"
      />
      <path
        d="M53.8 72.2c-8.4 3.8-11.6 9.2-8.4 15.4 3.3 6.4 12.8 8.8 21.2 5.2 8.4-3.6 11.6-11.2 8.3-17.4-1.8-3.4-9.8-7-21.1-3.2z"
        fill="#74b3ce"
        opacity="0.8"
      />
      <path
        d="M73.6 96c-3 5.4-10.6 7.4-17.2 4.6"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
};
