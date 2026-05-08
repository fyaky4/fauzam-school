import React from 'react';
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm';
};

export function Button({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-lg transition border';

  const variantClass =
    variant === 'outline'
      ? 'bg-white text-slate-900 border-slate-300 hover:bg-slate-100'
      : 'bg-slate-900 text-white border-slate-900 hover:opacity-90';

  const sizeClass =
    size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm';

  return (
    <button
      className={`${base} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}