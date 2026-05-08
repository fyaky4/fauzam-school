import React from 'react';

export function Progress({
  value,
  className = '',
}: {
  value: number;
  className?: string;
}) {
  return (
    <div className={`w-full rounded-full bg-slate-200 ${className}`}>
      <div
        className="rounded-full bg-violet-600"
        style={{ width: `${Math.max(0, Math.min(100, value))}%`, height: '100%' }}
      />
    </div>
  );
}