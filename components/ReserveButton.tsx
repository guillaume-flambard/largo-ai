"use client";

import type { ReactNode } from "react";
import { buttonClass, type ButtonSize, type ButtonVariant } from "./Button";
import { useBooking } from "./BookingContext";

/**
 * Largo IA — a Button that opens the booking modal.
 * Usable inside Server Components since the click origin is here, on the client.
 */
export function ReserveButton({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  fullWidth = false,
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}) {
  const { open } = useBooking();
  return (
    <button
      type="button"
      className={buttonClass(variant, size, fullWidth)}
      onClick={open}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
