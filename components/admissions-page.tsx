'use client';

import React, { useState } from 'react';
import type { ApplicationItem } from '../lib/types';
import { createApplication, uploadAdmissionDocument } from '../lib/supabase';

type Props = {
  setApplications: React.Dispatch<React.SetStateAction<ApplicationItem[]>>;
};

type FileState = {
  student_photo: File | null;
  birth_certificate: File | null;
  previous_report: File | null;
  medical_record: File | null;
};

export default function AdmissionsPage({ setApplications }: Props) {
  const [form, setForm] = useState({
    parent_name: '',
    student_name: '',
    email: '',
    track: '',
    type: 'application' as 'application' | 'waitlist',
    notes: '',

    date_of_birth: '',
    gender: '',
    previous_school: '',
    medical_info: '',

    phone: '',
    whatsapp: '',
    address: '',
    relationship_to_child: '',

    emergency_contact_name: '',
    emergency_contact_phone: '',
    emergency_contact_relationship: '',
  });

  const [files, setFiles] = useState<FileState>({
    student_photo: null,
    birth_certificate: null,
    previous_report: null,
    medical_record: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const updateFile = (key: keyof FileState, file: File | null) => {
    setFiles((prev) => ({
      ...prev,
      [key]: file,
    }));
  };

  const resetForm = () => {
    setForm({
      parent_name: '',
      student_name: '',
      email: '',
      track: '',
      type: 'application',
      notes: '',

      date_of_birth: '',
      gender: '',
      previous_school: '',
      medical_info: '',

      phone: '',
      whatsapp: '',
      address: '',
      relationship_to_child: '',

      emergency_contact_name: '',
      emergency_contact_phone: '',
      emergency_contact_relationship: '',
    });

    setFiles({
      student_photo: null,
      birth_certificate: null,
      previous_report: null,
      medical_record: null,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    setMessage('');
    setSuccess(false);

    const folderName = `${form.student_name || 'student'}-${Date.now()}`
      .replaceAll(' ', '-')
      .toLowerCase();

    const [
      studentPhotoUrl,
      birthCertificateUrl,
      previousReportUrl,
      medicalRecordUrl,
    ] = await Promise.all([
      files.student_photo
        ? uploadAdmissionDocument(files.student_photo, folderName)
        : Promise.resolve(null),
      files.birth_certificate
        ? uploadAdmissionDocument(files.birth_certificate, folderName)
        : Promise.resolve(null),
      files.previous_report
        ? uploadAdmissionDocument(files.previous_report, folderName)
        : Promise.resolve(null),
      files.medical_record
        ? uploadAdmissionDocument(files.medical_record, folderName)
        : Promise.resolve(null),
    ]);

    const payload: Omit<ApplicationItem, 'id'> = {
      parent_name: form.parent_name,
      student_name: form.student_name,
      email: form.email,
      track: form.track,
      status: 'Pending Review',
      type: form.type,
      notes: form.notes || '',
      created_at: new Date().toISOString(),

      date_of_birth: form.date_of_birth,
      gender: form.gender,
      previous_school: form.previous_school,
      medical_info: form.medical_info,

      phone: form.phone,
      whatsapp: form.whatsapp,
      address: form.address,
      relationship_to_child: form.relationship_to_child,

      emergency_contact_name: form.emergency_contact_name,
      emergency_contact_phone: form.emergency_contact_phone,
      emergency_contact_relationship: form.emergency_contact_relationship,

      student_photo_url: studentPhotoUrl ?? undefined,
      birth_certificate_url: birthCertificateUrl ?? undefined,
      previous_report_url: previousReportUrl ?? undefined,
      medical_record_url: medicalRecordUrl ?? undefined,
    };

    const saved = await createApplication(payload);

    if (saved) {
      setApplications((prev) => [saved, ...prev]);
      resetForm();
      setSuccess(true);
      setMessage(
        'Application submitted successfully. Our admissions team will contact you after review.'
      );
    } else {
      setSuccess(false);
      setMessage('Could not submit application. Please try again.');
    }

    setSubmitting(false);
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <section className="rounded-3xl bg-gradient-to-r from-purple-800 via-violet-700 to-fuchsia-600 p-8 text-white shadow-xl lg:p-12">
        <h1 className="text-3xl font-bold lg:text-4xl">Admissions</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-purple-100 lg:text-base">
          Begin your child’s journey with Fauzam International Academy.
        </p>
      </section>

      <section className="mt-10 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Admission Application Form
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-8">
            <section>
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Student Information
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  value={form.student_name}
                  onChange={(e) =>
                    setForm({ ...form, student_name: e.target.value })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="Student Full Name"
                  required
                />

                <input
                  type="date"
                  value={form.date_of_birth}
                  onChange={(e) =>
                    setForm({ ...form, date_of_birth: e.target.value })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                  required
                />

                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>

                <select
                  value={form.track}
                  onChange={(e) => setForm({ ...form, track: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                  required
                >
                  <option value="">Select Class</option>
                  <option value="Playgroup">Playgroup</option>
                  <option value="Pre-Nursery">Pre-Nursery</option>
                  <option value="Nursery 1">Nursery 1</option>
                  <option value="Nursery 2">Nursery 2</option>

                  <option value="Primary 1">Primary 1</option>
                  <option value="Primary 2">Primary 2</option>
                  <option value="Primary 3">Primary 3</option>
                  <option value="Primary 4">Primary 4</option>
                  <option value="Primary 5">Primary 5</option>
                  <option value="Primary 6">Primary 6</option>
                </select>

                <input
                  type="text"
                  value={form.previous_school}
                  onChange={(e) =>
                    setForm({ ...form, previous_school: e.target.value })
                  }
                  className="md:col-span-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="Previous School, if any"
                />

                <textarea
                  value={form.medical_info}
                  onChange={(e) =>
                    setForm({ ...form, medical_info: e.target.value })
                  }
                  className="md:col-span-2 min-h-[100px] w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="Medical information, allergies, or special needs"
                />
              </div>
            </section>

            <section>
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Parent / Guardian Information
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  value={form.parent_name}
                  onChange={(e) =>
                    setForm({ ...form, parent_name: e.target.value })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="Parent/Guardian Full Name"
                  required
                />

                <input
                  type="text"
                  value={form.relationship_to_child}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      relationship_to_child: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="Relationship to Child"
                  required
                />

                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="Phone Number"
                  required
                />

                <input
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) =>
                    setForm({ ...form, whatsapp: e.target.value })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="WhatsApp Number"
                />

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="md:col-span-2 w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="Email Address"
                  required
                />

                <textarea
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="md:col-span-2 min-h-[100px] w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="Home Address"
                  required
                />
              </div>
            </section>

            <section>
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Emergency Contact
              </h3>

              <div className="grid gap-4 md:grid-cols-3">
                <input
                  type="text"
                  value={form.emergency_contact_name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      emergency_contact_name: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="Name"
                  required
                />

                <input
                  type="tel"
                  value={form.emergency_contact_phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      emergency_contact_phone: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="Phone Number"
                  required
                />

                <input
                  type="text"
                  value={form.emergency_contact_relationship}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      emergency_contact_relationship: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                  placeholder="Relationship"
                  required
                />
              </div>
            </section>

            <section>
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Documents Upload
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">
                  Child Passport / Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      updateFile('student_photo', e.target.files?.[0] ?? null)
                    }
                    className="mt-3 block w-full text-sm"
                  />
                </label>

                <label className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">
                  Birth Certificate
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) =>
                      updateFile(
                        'birth_certificate',
                        e.target.files?.[0] ?? null
                      )
                    }
                    className="mt-3 block w-full text-sm"
                  />
                </label>

                <label className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">
                  Previous School Report / Result
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) =>
                      updateFile('previous_report', e.target.files?.[0] ?? null)
                    }
                    className="mt-3 block w-full text-sm"
                  />
                </label>

                <label className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">
                  Immunization / Medical Record
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) =>
                      updateFile('medical_record', e.target.files?.[0] ?? null)
                    }
                    className="mt-3 block w-full text-sm"
                  />
                </label>
              </div>
            </section>

            <section>
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Application Type and Notes
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
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
                  placeholder="Additional Notes"
                />
              </div>
            </section>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-violet-700 px-6 py-3 font-semibold text-white hover:bg-violet-800 disabled:opacity-60"
            >
              {submitting ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 rounded-2xl p-4 text-sm ${
                success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}
            >
              {message}
            </p>
          )}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Admission Information
          </h2>

          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
            <p>
              After submission, the admissions team will review your application
              and contact you with the next steps.
            </p>

            <p>
              Please ensure that all parent, student, emergency contact, and
              document details are accurate before submitting.
            </p>

            <div className="rounded-2xl bg-purple-50 p-4 text-slate-700">
              Available tracks: Pre-Nursery, Nursery, and Primary.
            </div>

            <div className="rounded-2xl bg-yellow-50 p-4 text-slate-700">
              Required documents may include child photo, birth certificate,
              previous school report, and medical/immunization record.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}