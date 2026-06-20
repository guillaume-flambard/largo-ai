import type { ReactNode, ButtonHTMLAttributes } from "react";
import { LocaleLink } from "./LocaleLink";

export type ButtonVariant = "primary" | "accent" | "ghost" | "light" | "ink";
export type ButtonSize = "sm" | "md" | "lg";

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  fullWidth = false,
  disabled = false,
) {
  return [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? "btn--full" : "",
    disabled ? "btn--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
};

/**
 * Largo IA — Button. Primary CTA is the vivid green pill.
 * Renders an <a> when `href` is provided, otherwise a <button>.
 * For modal-triggering buttons inside Server Components, use
 * <ReserveButton> which wires the booking context.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  type = "button",
  ...rest
}: CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: string }) {
  const className = buttonClass(variant, size, fullWidth, disabled);
  const content = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  );

  if (href && !disabled) {
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    if (isInternal) {
      return (
        <LocaleLink href={href} className={className}>
          {content}
        </LocaleLink>
      );
    }
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={className} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
