/** @format */
"use client";

import React from "react";
import { Button } from "../button";

type Props = React.ComponentProps<typeof Button> & {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
};

export default function CustomButton({
  className = "",
  disabled,
  isLoading,
  leftIcon,
  children,
  ...props
}: Props) {
  const isDisabled = disabled || isLoading;

  return (
    <Button
      {...props}
      disabled={isDisabled}
      className={`px-5 py-3 rounded-xl cursor-pointer h-12 font-medium transition-all inline-flex items-center gap-2 ${
        isDisabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-purple-600 text-white hover:bg-purple-700"
      } ${className}`}
    >
      {leftIcon}
      {isLoading ? "Saving..." : children}
    </Button>
  );
}
