'use client';

import React, { useState } from 'react';

export default function GalleryPage() {
  const images = [
    '/images/im1.png',
  '/images/im2.png',
  '/images/im3.png',
  '/images/im4.png',
  '/images/im5.png',
  '/images/im6.png',
  '/images/im7.png',
  '/images/im8.png',
  ];

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Gallery</h1>
      <p className="mt-2 text-slate-600">
        A glimpse into life at Fauzam International Academy.
      </p>

      {/* Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setSelected(img)}
            className="cursor-pointer overflow-hidden rounded-3xl shadow-md hover:scale-105 transition"
          >
            <img
              src={img}
              alt="Gallery"
              className="h-64 w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* 🔥 Image Preview Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        >
          <img
            src={selected}
            alt="Preview"
            className="max-h-[90%] max-w-[90%] rounded-2xl"
          />
        </div>
      )}
    </main>
  );
}