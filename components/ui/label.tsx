import React from 'react';

type LabelProps = {
  children: React.ReactNode;
  className?: string;
};

function Label({ children, className = '' }: LabelProps) {
  return <label className={`text-sm font-medium ${className}`}>{children}</label>;
}

export default Label;