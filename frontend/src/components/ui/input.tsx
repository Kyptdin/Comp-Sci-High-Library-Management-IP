/**
 * @fileoverview Custom input component for forms.
 * @packageDocumentation
 */

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Props for the Input component, extending the standard HTML input element attributes.
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Custom input component for forms.
 * @param className - Additional CSS classes for the input.
 * @param type - Type of the input element (e.g., text, number, etc.).
 * @param props - Additional props to pass to the input element.
 * @returns The input element.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
