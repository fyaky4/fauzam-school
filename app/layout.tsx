import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Fauzam International School',
  description: 'School website and management portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}