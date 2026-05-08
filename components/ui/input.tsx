import React from 'react';

function Input({
  className = '',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-violet-300 ${className}`}
      {...props}
    />
  );
}

export default Input;