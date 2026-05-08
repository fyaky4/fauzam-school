'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

      {/* HERO / INTRO */}
      <section className="rounded-3xl bg-gradient-to-r from-purple-800 via-violet-700 to-fuchsia-600 p-8 text-white shadow-xl lg:p-12">
        <h1 className="text-4xl font-bold lg:text-5xl">About Fauzam International School</h1>

        <p className="mt-6 max-w-3xl text-lg text-purple-100 leading-8">
          Fauzam International School is a forward-thinking institution in Kano, Nigeria,
          committed to raising academically strong, morally sound, and future-ready learners.
          We combine structured education with practical skills and character development.
        </p>
      </section>

      {/* SCHOOL OVERVIEW */}
      <section className="mt-10">
        <Card className="rounded-3xl shadow-sm ring-1 ring-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl">Who We Are</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5 leading-7 text-slate-700">
            <p>
              Fauzam International School provides a nurturing and structured learning environment
              where children develop strong academic foundations alongside essential life skills.
            </p>

            <p>
              Our approach focuses on discipline, creativity, digital literacy, and leadership,
              ensuring that every child is prepared not just for exams, but for real-world success.
            </p>

            <p>
              We currently offer Pre-Nursery, Nursery, and Primary education, with structured plans
              for expansion into Junior and Senior Secondary levels.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* VISION & MISSION */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">

        <Card className="rounded-3xl shadow-sm ring-1 ring-slate-200">
          <CardHeader>
            <CardTitle className="text-xl">Our Vision</CardTitle>
          </CardHeader>

          <CardContent className="text-slate-700 leading-7">
            To raise confident, disciplined, and highly capable learners who are equipped
            to excel academically and contribute meaningfully to society.
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-sm ring-1 ring-slate-200">
          <CardHeader>
            <CardTitle className="text-xl">Our Mission</CardTitle>
          </CardHeader>

          <CardContent className="text-slate-700 leading-7">
            To provide high-quality education that combines academic excellence,
            strong moral values, and practical life skills in a supportive learning environment.
          </CardContent>
        </Card>

      </section>

      {/* CORE VALUES */}
      <section className="mt-10">
        <Card className="rounded-3xl shadow-sm ring-1 ring-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl">Our Core Values</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                'Excellence',
                'Integrity',
                'Discipline',
                'Creativity',
              ].map((value) => (
                <div
                  key={value}
                  className="rounded-2xl bg-purple-50 px-5 py-4 text-center text-lg font-semibold text-slate-800"
                >
                  {value}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

    </main>
  );
}