"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import { BookingModal } from "./BookingModal";

type BookingContextValue = { open: () => void };

const BookingContext = createContext<BookingContextValue | null>(null);

/** Wraps the page so any descendant can open the booking modal. */
export function BookingProvider({
  children,
  locale = "fr",
}: {
  children: ReactNode;
  locale?: "fr" | "en";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <BookingContext.Provider value={{ open }}>
      {children}
      <BookingModal open={isOpen} onClose={close} locale={locale} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return ctx;
}
