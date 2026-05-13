'use client';

import React from 'react';
import HeroSlider from './hero-slider';

type Props = {
  setPage: (page: any) => void;
};

export default function HomePage({ setPage }: Props) {
  return (
    <main className="mx-auto max-w-7xl space-y-12 px-6 py-10 lg:px-8">

      {/* 🔥 HERO SLIDER */}
      <HeroSlider />

      {/* 🔥 MAIN HERO CONTENT */}
      <section className="rounded-3xl bg-gradient-to-r from-purple-800 via-violet-700 to-fuchsia-600 p-8 text-white shadow-xl lg:p-12">
        <h1 className="text-3xl font-bold lg:text-5xl">
          Empowering Young Minds for a Brighter Future
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-purple-100 lg:text-lg">
          Fauzam International Academy provides a nurturing environment where
          children develop strong academic skills, character, creativity, and
          confidence to thrive in a changing world.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={() => setPage('admissions')}
            className="rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-500"
          >
            Apply Now
          </button>

          <button
            onClick={() => setPage('programs')}
            className="rounded-2xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur hover:bg-white/20"
          >
            Explore Programs
          </button>
        </div>
      </section>

      {/* 🔥 WHY CHOOSE US */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Academic Sections
          </h2>

          <div className="mt-4 space-y-3 text-slate-600">
            <div>Pre-Nursery</div>
            <div>Nursery</div>
            <div>Primary</div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Why Parents Choose Us
          </h2>

          <div className="mt-4 space-y-3 text-slate-600">
            <div>Strong academic foundation</div>
            <div>Digital literacy and coding</div>
            <div>Skills-based learning</div>
            <div>Safe and supportive environment</div>
          </div>
        </div>
      </section>

      {/* 🔥 PROGRAMS SECTION (NEW) */}
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">Our Programs</h2>
        <p className="mt-2 text-slate-600">
          Structured learning paths designed for every stage of your child’s development.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl overflow-hidden border hover:shadow-lg transition">
            <img src="/images/im3.png" className="h-44 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">Pre-Nursery</h3>
              <p className="text-sm text-slate-600 mt-2">
                Early childhood development through play-based learning.
              </p>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border hover:shadow-lg transition">
            <img src="/images/im2.png" className="h-44 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">Nursery</h3>
              <p className="text-sm text-slate-600 mt-2">
                Foundational literacy, numeracy, and social skills.
              </p>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border hover:shadow-lg transition">
            <img src="/images/im4.png" className="h-44 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">Primary</h3>
              <p className="text-sm text-slate-600 mt-2">
                Strong academic foundation with creativity and innovation.
              </p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}