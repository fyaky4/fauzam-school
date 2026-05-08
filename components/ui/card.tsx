import React from 'react';

type ClassNameProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = '' }: ClassNameProps) {
  return (
    <div className={`rounded-xl border bg-white p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: ClassNameProps) {
  return <div className={`mb-3 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }: ClassNameProps) {
  return <div className={`text-lg font-bold ${className}`}>{children}</div>;
}

export function CardDescription({ children, className = '' }: ClassNameProps) {
  return <div className={`text-sm text-slate-500 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = '' }: ClassNameProps) {
  return <div className={className}>{children}</div>;
}