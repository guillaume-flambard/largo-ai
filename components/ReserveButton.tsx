"use client";

import type { CSSProperties, ReactNode } from "react";
import { buttonClass, type ButtonSize, type ButtonVariant } from "./Button";
import { useBooking } from "./BookingContext";

/**
 * Largo IA — a Button that opens the booking modal.
 * Usable inside Server Components since the click origin is here, on the client.
 *
 * When `className`/`style` are passed, they OVERRIDE the default `btn` classes —
 * this lets the SaaS redesign render its own gradient "sun" pill while keeping
 * the booking-modal trigger intact.
 */
export function ReserveButton({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  fullWidth = false,
  className,
  style,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
}) {
  const { open } = useBooking();
  // When a custom className/style is provided, drop the default btn classes so
  // the redesign's bespoke styling takes over.
  const resolvedClass =
    className !== undefined ? className : buttonClass(variant, size, fullWidth);
  return (
    <button
      type="button"
      className={resolvedClass}
      style={style}
      onClick={open}
      aria-label={ariaLabel}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
