'use client';

import React, { useState } from 'react';
import type { ApplicationItem } from '../lib/types';
import { createApplication } from '../lib/supabase';

type Props = {
  setApplications: React.Dispatch<React.SetStateAction<ApplicationItem[]>>;
};

export default function AdmissionsPage({ setApplications }: Props) {
  const [form, setForm] = useState({
    parent_name: '',
    student_name: '',
    email: '',
    track: '',
    type: 'application' as 'application' | 'waitlist',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    const payload: Omit<ApplicationItem, 'id'> = {
      parent_name: form.parent_name,
      student_name: form.student_name,
      email: form.email,
      track: form.track,
      status: 'Pending Review',
      type: form.type,
      notes: form.notes || '',
      created_at: new Date().toISOString(),
    };

    const saved = await createApplication(payload);

    if (saved) {
      setApplications((prev) => [saved, ...prev]);
      setForm({
        parent_name: '',
        student_name: '',
        email: '',
        track: '',
        type: 'application',
        notes: '',
      });
      setMessage('Application submitted successfully. Our admissions team will contact you after review.');
    } else {
      setMessage('Could not submit application. Please try again.');
    }

    setSubmitting(false);
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <section className="rounded-3xl bg-gradient-to-r from-purple-800 via-violet-700 to-fuchsia-600 p-8 text-white shadow-xl lg:p-12">
        <h1 className="text-3xl font-bold lg:text-4xl">Admissions</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-purple-100 lg:text-base">
          Begin your child’s journey with Fauzam International School.
        </p>
      </section>

      <section className="mt-10 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Admission Form</h2>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              value={form.parent_name}
              onChange={(e) => setForm({ ...form, parent_name: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Parent/Guardian Name"
              required
            />

            <input
              type="text"
              value={form.student_name}
              onChange={(e) => setForm({ ...form, student_name: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Student Name"
              required
            />

            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="md:col-span-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Email Address"
              required
            />

            <select
              value={form.track}
              onChange={(e) => setForm({ ...form, track: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              required
            >
              <option value="">Select track</option>
              <option value="Pre-Nursery">Pre-Nursery</option>
              <option value="Nursery">Nursery</option>
              <option value="Primary">Primary</option>
              <option value="Junior Secondary">Junior Secondary</option>
              <option value="Senior Secondary">Senior Secondary</option>
            </select>

            <select
              value={form.type}
              onChange={(e) =>
                setForm({
                  ...form,
                  type: e.target.value as 'application' | 'waitlist',
                })
              }
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            >
              <option value="application">Application</option>
              <option value="waitlist">Waitlist</option>
            </select>

            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="md:col-span-2 min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3"
              placeholder="Notes"
            />

            <button
              type="submit"
              disabled={submitting}
              className="md:col-span-2 rounded-2xl bg-violet-700 px-6 py-3 font-semibold text-white hover:bg-violet-800 disabled:opacity-60"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>

          {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Admission Information</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
            <p>
              After submission, the admissions team will review your application and contact you with the next steps.
            </p>
            <p>
              Please ensure that all parent and student details are accurate before submitting.
            </p>
            <div className="rounded-2xl bg-purple-50 p-4 text-slate-700">
              Available tracks: Pre-Nursery, Nursery, Primary, Junior Secondary, and Senior Secondary.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}