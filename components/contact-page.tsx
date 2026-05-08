'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CalendarDays,
} from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-6 py-12 lg:px-8">

      {/* HERO */}
      <section className="rounded-3xl bg-gradient-to-r from-purple-800 via-violet-700 to-fuchsia-600 p-8 text-white shadow-xl lg:p-12">
        <h1 className="text-3xl font-bold lg:text-5xl">
          Contact Fauzam International Academy
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-purple-100 lg:text-lg">
          We would love to hear from you. Reach out to us for admissions,
          inquiries, school tours, partnerships, or any questions about our
          programs.
        </p>
      </section>

      {/* CONTACT GRID */}
      <section className="grid gap-8 lg:grid-cols-2">

        {/* CONTACT INFO */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Get In Touch
          </h2>

          <div className="mt-8 space-y-6">

            <div className="flex gap-4">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                <MapPin className="h-6 w-6" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  School Address
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  No 33 Karkasara Quarters,
                  <br />
                  Inuwa Dutse Street off Karkasara Junction,
                  <br />
                  Kano, Nigeria.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                <Phone className="h-6 w-6" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Phone / WhatsApp
                </h3>

                <div className="mt-1 space-y-1 text-sm text-slate-600">
                  <div>+2347060424977</div>
                  <div>+2348038828342</div>
                  <div>+2348134731299</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                <Mail className="h-6 w-6" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Website
                </h3>

                <a
                  href="https://fauzaminternationalacademy.com"
                  target="_blank"
                  className="mt-1 block text-sm text-violet-700 hover:underline"
                >
                  www.fauzaminternationalacademy.com
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                <Clock className="h-6 w-6" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Office Hours
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  Monday – Friday
                  <br />
                  8:00 AM – 5:00 PM
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* TOUR BOOKING FORM */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-7 w-7 text-violet-700" />

            <h2 className="text-2xl font-bold text-slate-900">
              Book a School Tour
            </h2>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Schedule a visit to explore our learning environment, meet our
            teachers, and discover what makes Fauzam International Academy
            special.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid gap-4 md:grid-cols-2"
          >

            <input
              type="text"
              placeholder="Parent Name"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2"
            />

            <input
              type="text"
              placeholder="Child Class / Age"
              className="rounded-2xl border border-slate-200 px-4 py-3"
            />

            <input
              type="date"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3"
            />

            <textarea
              placeholder="Additional Message"
              className="min-h-[140px] rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2"
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-2xl bg-violet-700 px-6 py-3 font-semibold text-white transition hover:bg-violet-800 md:col-span-2"
            >
              <Send className="h-4 w-4" />
              Book Tour
            </button>

          </form>

          {submitted && (
            <div className="mt-4 rounded-2xl bg-green-50 p-4 text-sm text-green-700">
              Your tour request has been submitted successfully.
            </div>
          )}
        </div>

      </section>

      {/* MAP SECTION */}
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Find Us
        </h2>

        <div className="mt-6 overflow-hidden rounded-3xl">
          <iframe
            title="School Location"
            src="https://maps.google.com/maps?q=Kano%20Nigeria&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="450"
            loading="lazy"
            className="border-0"
          />
        </div>
      </section>

    </main>
  );
}