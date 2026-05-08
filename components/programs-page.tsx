'use client';

import React from 'react';

type Program = {
  title: string;
  image: string;
  description: string;
  highlights: string[];
};

const programs: Program[] = [
  {
    title: 'Pre-Nursery',
    image: '/images/im2.png',
    description:
      'A warm early-years environment where children begin learning through play, songs, storytelling, social interaction, and guided activities.',
    highlights: [
      'Play-based learning',
      'Early communication skills',
      'Basic numbers and sounds',
      'Social and emotional development',
    ],
  },
  {
    title: 'Nursery',
    image: '/images/im4.png',
    description:
      'A structured foundation stage focused on literacy, numeracy, confidence, creativity, and good classroom habits.',
    highlights: [
      'Phonics and early reading',
      'Counting and number recognition',
      'Creative activities',
      'Character and discipline',
    ],
  },
  {
    title: 'Primary School',
    image: '/images/im8.png',
    description:
      'A strong academic program that builds knowledge, confidence, digital literacy, problem-solving, and leadership skills.',
    highlights: [
      'English, Mathematics, and Science',
      'ICT and digital literacy',
      'Critical thinking',
      'Leadership and character development',
    ],
  },
];

export default function ProgramsPage({
  setPage,
}: {
  setPage: (page: any) => void;
}) {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-6 py-12 lg:px-8">
      <section className="rounded-3xl bg-gradient-to-r from-purple-800 via-violet-700 to-fuchsia-600 p-8 text-white shadow-xl lg:p-12">
        <h1 className="text-3xl font-bold lg:text-5xl">Our Programs</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-purple-100 lg:text-lg">
          Fauzam International Academy offers carefully structured learning
          pathways for young learners, beginning with Pre-Nursery, Nursery, and
          Primary School.
        </p>

        <button
          onClick={() => setPage('admissions')}
          className="mt-6 rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-500"
        >
          Apply for Admission
        </button>
      </section>

      <section className="grid gap-8">
        {programs.map((program, index) => (
          <div
            key={program.title}
            className="grid overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 lg:grid-cols-2"
          >
            <img
              src={program.image}
              alt={program.title}
              className={`h-72 w-full object-cover lg:h-full ${
                index % 2 === 1 ? 'lg:order-2' : ''
              }`}
            />

            <div className="p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                {program.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                {program.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {program.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-violet-50 p-4 text-sm font-medium text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}