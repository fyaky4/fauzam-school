import React from 'react';

type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export function Dialog({
  open,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return <>{children}</>;
}

export function DialogContent({ children, className = '' }: WrapperProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className={`w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg ${className}`}>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children, className = '' }: WrapperProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function DialogTitle({ children, className = '' }: WrapperProps) {
  return <div className={`text-lg font-bold ${className}`}>{children}</div>;
}

export function DialogDescription({ children, className = '' }: WrapperProps) {
  return <div className={`text-sm text-slate-500 ${className}`}>{children}</div>;
}

export function DialogFooter({ children, className = '' }: WrapperProps) {
  return <div className={`mt-4 flex justify-end gap-2 ${className}`}>{children}</div>;
}