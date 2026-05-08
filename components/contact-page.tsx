'use client';

import React, { useState } from 'react';
import { createTourBooking } from '@/lib/supabase';
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
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    parent_name: '',
    phone: '',
    email: '',
    child_class_or_age: '',
    preferred_date: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitted(false);
    setMessage('');
    setSubmitting(true);

    const saved = await createTourBooking({
      parent_name: form.parent_name,
      phone: form.phone,
      email: form.email,
      child_class_or_age: form.child_class_or_age,
      preferred_date: form.preferred_date,
      message: form.message,
      created_at: new Date().toISOString(),
    });

    if (saved) {
      setSubmitted(true);
      setMessage('Your tour request has been submitted successfully.');

      setForm({
        parent_name: '',
        phone: '',
        email: '',
        child_class_or_age: '',
        preferred_date: '',
        message: '',
      });
    } else {
      setMessage('Could not submit your tour request. Please try again.');
    }

    setSubmitting(false);
  };

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-6 py-12 lg:px-8">
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

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Get In Touch</h2>

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
                  <a
                    href="https://wa.me/2347060424977"
                    target="_blank"
                    rel="noreferrer"
                    className="block hover:text-violet-700 hover:underline"
                  >
                    +2347060424977
                  </a>
                  <a
                    href="https://wa.me/2348038828342"
                    target="_blank"
                    rel="noreferrer"
                    className="block hover:text-violet-700 hover:underline"
                  >
                    +2348038828342
                  </a>
                  <a
                    href="https://wa.me/2348134731299"
                    target="_blank"
                    rel="noreferrer"
                    className="block hover:text-violet-700 hover:underline"
                  >
                    +2348134731299
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                <Mail className="h-6 w-6" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">Website</h3>

                <a
                  href="https://fauzaminternationalacademy.com"
                  target="_blank"
                  rel="noreferrer"
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
                <h3 className="font-semibold text-slate-900">Office Hours</h3>

                <p className="mt-1 text-sm text-slate-600">
                  Monday – Friday
                  <br />
                  8:00 AM – 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

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
              value={form.parent_name}
              onChange={(e) =>
                setForm({ ...form, parent_name: e.target.value })
              }
              className="rounded-2xl border border-slate-200 px-4 py-3"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="rounded-2xl border border-slate-200 px-4 py-3"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2"
            />

            <input
              type="text"
              placeholder="Child Class / Age"
              value={form.child_class_or_age}
              onChange={(e) =>
                setForm({ ...form, child_class_or_age: e.target.value })
              }
              className="rounded-2xl border border-slate-200 px-4 py-3"
            />

            <input
              type="date"
              required
              value={form.preferred_date}
              onChange={(e) =>
                setForm({ ...form, preferred_date: e.target.value })
              }
              className="rounded-2xl border border-slate-200 px-4 py-3"
            />

            <textarea
              placeholder="Additional Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="min-h-[140px] rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2"
            />

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 rounded-2xl bg-violet-700 px-6 py-3 font-semibold text-white transition hover:bg-violet-800 disabled:opacity-60 md:col-span-2"
            >
              <Send className="h-4 w-4" />
              {submitting ? 'Submitting...' : 'Book Tour'}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 rounded-2xl p-4 text-sm ${
                submitted
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Find Us</h2>

        <div className="mt-6 overflow-hidden rounded-3xl">
          <iframe
            title="School Location"
            src="https://maps.google.com/maps?q=No%2033%20Karkasara%20Quarters%20Inuwa%20Dutse%20Street%20Kano%20Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
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