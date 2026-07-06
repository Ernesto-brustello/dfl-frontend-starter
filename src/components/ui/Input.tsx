import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

/** Classes compartilhadas com `<select>` nos formulários */
export const formFieldClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return <input className={cn(formFieldClass, className)} {...props} />;
}
