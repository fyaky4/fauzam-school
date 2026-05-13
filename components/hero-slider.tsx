'use client';

import { useEffect, useState } from 'react';

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


export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-3xl">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="Fauzam School"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
        <h1 className="text-3xl font-bold lg:text-5xl">
          Fauzam International Academy
        </h1>
        <p className="mt-4 max-w-2xl text-sm lg:text-lg">
          Empowering young minds for a brighter future through excellence,
          discipline, and innovation.
        </p>
      </div>
    </div>
  );
}