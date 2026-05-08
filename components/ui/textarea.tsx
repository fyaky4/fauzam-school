import React from 'react';

export function Textarea({
  className = '',
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-violet-300 ${className}`}
      {...props}
    />
  );
}