'use client';

import React, { useMemo, useState } from 'react';
import type {
  AnnouncementItem,
  ApplicationItem,
  ApplicationStatus,
  ClassRecord,
  StudentRecord,
} from '../lib/types';
import {
  addGrade,
  createAnnouncement,
  createDefaultAttendanceForStudent,
  createDefaultFeeForStudent,
  createStudentFromApplication,
  listStudents,
  updateApplicationStatus as saveApplicationStatus,
  updateStudentAttendance,
  updateStudentFee,
  updateStudentFeeStatus,
} from '../lib/supabase';

type Props = {
  applications: ApplicationItem[];
  setApplications: React.Dispatch<React.SetStateAction<ApplicationItem[]>>;
  students: StudentRecord[];
  setStudents: React.Dispatch<React.SetStateAction<StudentRecord[]>>;
  classes: ClassRecord[];
  announcements: AnnouncementItem[];
  setAnnouncements: React.Dispatch<React.SetStateAction<AnnouncementItem[]>>;
};

export default function AdminPage({
  applications,
  setApplications,
  students,
  setStudents,
  classes,
  announcements,
  setAnnouncements,
}: Props) {
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    audience: '',
    body: '',
  });

  const [gradeForm, setGradeForm] = useState({
    studentId: '',
    subject: '',
    score: '',
  });

  const [savingId, setSavingId] = useState<string | null>(null);
  const [postingAnnouncement, setPostingAnnouncement] = useState(false);
  const [postingGrade, setPostingGrade] = useState(false);
  const [gradeMessage, setGradeMessage] = useState('');
  const [feeForm, setFeeForm] = useState({
    studentId: '',
    amountDue: '',
    amountPaid: '',
  });
  const [postingFee, setPostingFee] = useState(false);
  const [feeMessage, setFeeMessage] = useState('');
  const [attendanceForm, setAttendanceForm] = useState({
    studentId: '',
    attendancePercent: '',
  });
  const [postingAttendance, setPostingAttendance] = useState(false);
  const [attendanceMessage, setAttendanceMessage] = useState('');

  const updateStatus = async (id: string, status: ApplicationStatus) => {
    setSavingId(id);

    const targetApplication = applications.find((app) => app.id === id);
    const ok = await saveApplicationStatus(id, status);

    if (ok) {
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      );

      if (status === 'Accepted' && targetApplication) {
        const student = await createStudentFromApplication({
          ...targetApplication,
          status,
        });

        if (student) {
          await Promise.all([
            createDefaultFeeForStudent(student.id),
            createDefaultAttendanceForStudent(student.id),
          ]);

          const refreshedStudents = await listStudents();
          setStudents(refreshedStudents);
        }
      }
    }

    setSavingId(null);
  };

  const addAnnouncement = async () => {
    if (
      !announcementForm.title.trim() ||
      !announcementForm.audience.trim() ||
      !announcementForm.body.trim()
    ) {
      return;
    }

    setPostingAnnouncement(true);

    const saved = await createAnnouncement({
      title: announcementForm.title,
      audience: announcementForm.audience,
      body: announcementForm.body,
      created_at: new Date().toISOString(),
    });

    if (saved) {
      setAnnouncements((prev) => [saved, ...prev]);
      setAnnouncementForm({
        title: '',
        audience: '',
        body: '',
      });
    }

    setPostingAnnouncement(false);
  };

  const submitGrade = async () => {
    setGradeMessage('');

    if (
      !gradeForm.studentId ||
      !gradeForm.subject.trim() ||
      gradeForm.score === ''
    ) {
      setGradeMessage('Please select a student, subject, and score.');
      return;
    }

    const numericScore = Number(gradeForm.score);

    if (Number.isNaN(numericScore) || numericScore < 0 || numericScore > 100) {
      setGradeMessage('Score must be a number between 0 and 100.');
      return;
    }

    setPostingGrade(true);

    const ok = await addGrade(
      gradeForm.studentId,
      gradeForm.subject,
      numericScore
    );

    if (ok) {
      setGradeForm({
        studentId: '',
        subject: '',
        score: '',
      });
      setGradeMessage('Grade saved successfully.');
    } else {
      setGradeMessage('Could not save grade.');
    }

    setPostingGrade(false);
  };

  const submitFee = async () => {
    setFeeMessage('');

    if (!feeForm.studentId || feeForm.amountDue === '' || feeForm.amountPaid === '') {
      setFeeMessage('Please select a student and enter fee amounts.');
      return;
    }

    const amountDue = Number(feeForm.amountDue);
    const amountPaid = Number(feeForm.amountPaid);

    if (
      Number.isNaN(amountDue) ||
      Number.isNaN(amountPaid) ||
      amountDue < 0 ||
      amountPaid < 0
    ) {
      setFeeMessage('Fee amounts must be valid positive numbers.');
      return;
    }

    let feeStatus: 'Paid' | 'Partially Paid' | 'Outstanding' = 'Outstanding';

    if (amountPaid >= amountDue && amountDue > 0) {
      feeStatus = 'Paid';
    } else if (amountPaid > 0) {
      feeStatus = 'Partially Paid';
    }

    setPostingFee(true);

    const [feeOk, statusOk] = await Promise.all([
      updateStudentFee(feeForm.studentId, amountDue, amountPaid),
      updateStudentFeeStatus(feeForm.studentId, feeStatus),
    ]);

    if (feeOk && statusOk) {
      const refreshedStudents = await listStudents();
      setStudents(refreshedStudents);

      setFeeForm({
        studentId: '',
        amountDue: '',
        amountPaid: '',
      });

      setFeeMessage('Fee record updated successfully.');
    } else {
      setFeeMessage('Could not update fee record.');
    }

    setPostingFee(false);
  };

  const submitAttendance = async () => {
    setAttendanceMessage('');

    if (!attendanceForm.studentId || attendanceForm.attendancePercent === '') {
      setAttendanceMessage('Please select a student and enter attendance percentage.');
      return;
    }

    const attendancePercent = Number(attendanceForm.attendancePercent);

    if (
      Number.isNaN(attendancePercent) ||
      attendancePercent < 0 ||
      attendancePercent > 100
    ) {
      setAttendanceMessage('Attendance must be a number between 0 and 100.');
      return;
    }

    setPostingAttendance(true);

    const ok = await updateStudentAttendance(
      attendanceForm.studentId,
      attendancePercent
    );

    if (ok) {
      setAttendanceForm({
        studentId: '',
        attendancePercent: '',
      });

      setAttendanceMessage('Attendance updated successfully.');
    } else {
      setAttendanceMessage('Could not update attendance.');
    }

    setPostingAttendance(false);
  };

  const pendingCount = applications.filter(
    (app) => app.status === 'Pending Review'
  ).length;

  const waitlistedCount = applications.filter(
    (app) => app.status === 'Waitlisted'
  ).length;

  const acceptedCount = applications.filter(
    (app) => app.status === 'Accepted'
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === 'Rejected'
  ).length;

  const totalApplications = applications.length;

  const acceptedStudents = useMemo(
    () => students.slice().sort((a, b) => a.name.localeCompare(b.name)),
    [students]
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Manage applications, student onboarding, announcements, and grades from one place.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Pending Review
          </h2>
          <p className="mt-3 text-4xl font-bold text-slate-900">{pendingCount}</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Waitlisted
          </h2>
          <p className="mt-3 text-4xl font-bold text-slate-900">{waitlistedCount}</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Accepted
          </h2>
          <p className="mt-3 text-4xl font-bold text-slate-900">{acceptedCount}</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Rejected
          </h2>
          <p className="mt-3 text-4xl font-bold text-slate-900">{rejectedCount}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Recent Applications</h2>
            <p className="text-sm text-slate-500">Review and update application statuses.</p>
          </div>

          {applications.length === 0 ? (
            <p className="text-sm text-slate-500">No applications are available yet.</p>
          ) : (
            <div className="space-y-4">
              {applications.slice(0, 8).map((application) => (
                <div key={application.id} className="rounded-3xl border border-slate-200 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{application.student_name}</p>
                      <p className="text-sm text-slate-500">Parent: {application.parent_name}</p>
                      <p className="text-sm text-slate-500">Track: {application.track}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {application.status}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={savingId === application.id}
                      onClick={() => void updateStatus(application.id, 'Accepted')}
                      className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      disabled={savingId === application.id}
                      onClick={() => void updateStatus(application.id, 'Waitlisted')}
                      className="rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-600 disabled:opacity-60"
                    >
                      Waitlist
                    </button>
                    <button
                      type="button"
                      disabled={savingId === application.id}
                      onClick={() => void updateStatus(application.id, 'Rejected')}
                      className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      disabled={savingId === application.id}
                      onClick={() => void updateStatus(application.id, 'Pending Review')}
                      className="rounded-2xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-300 disabled:opacity-60"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Add Grade</h2>
            <p className="mt-2 text-sm text-slate-500">
              Enter scores for accepted students.
            </p>

            <div className="mt-6 space-y-4">
              <select
                value={gradeForm.studentId}
                onChange={(e) =>
                  setGradeForm({ ...gradeForm, studentId: e.target.value })
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              >
                <option value="">Select student</option>
                {acceptedStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} — {student.class_name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={gradeForm.subject}
                onChange={(e) =>
                  setGradeForm({ ...gradeForm, subject: e.target.value })
                }
                placeholder="Subject"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              />

              <input
                type="number"
                min="0"
                max="100"
                value={gradeForm.score}
                onChange={(e) =>
                  setGradeForm({ ...gradeForm, score: e.target.value })
                }
                placeholder="Score"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              />

              <button
                type="button"
                onClick={() => void submitGrade()}
                disabled={postingGrade}
                className="w-full rounded-2xl bg-violet-700 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-800 disabled:opacity-60"
              >
                {postingGrade ? 'Saving...' : 'Save Grade'}
              </button>

              {gradeMessage && (
                <p className="text-sm text-slate-600">{gradeMessage}</p>
              )}
            </div>
          </div>
<div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
  <h2 className="text-xl font-semibold text-slate-900">Fees Management</h2>
  <p className="mt-2 text-sm text-slate-500">
    Update school fees and payment status for students.
  </p>

  <div className="mt-6 space-y-4">
    <select
      value={feeForm.studentId}
      onChange={(e) =>
        setFeeForm({ ...feeForm, studentId: e.target.value })
      }
      className="w-full rounded-2xl border border-slate-200 px-4 py-3"
    >
      <option value="">Select student</option>
      {acceptedStudents.map((student) => (
        <option key={student.id} value={student.id}>
          {student.name} — {student.class_name}
        </option>
      ))}
    </select>

    <input
      type="number"
      min="0"
      value={feeForm.amountDue}
      onChange={(e) =>
        setFeeForm({ ...feeForm, amountDue: e.target.value })
      }
      placeholder="Amount Due"
      className="w-full rounded-2xl border border-slate-200 px-4 py-3"
    />

    <input
      type="number"
      min="0"
      value={feeForm.amountPaid}
      onChange={(e) =>
        setFeeForm({ ...feeForm, amountPaid: e.target.value })
      }
      placeholder="Amount Paid"
      className="w-full rounded-2xl border border-slate-200 px-4 py-3"
    />

    <button
      type="button"
      onClick={() => void submitFee()}
      disabled={postingFee}
      className="w-full rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
    >
      {postingFee ? 'Updating...' : 'Update Fee'}
    </button>

    {feeMessage && (
      <p className="text-sm text-slate-600">{feeMessage}</p>
    )}
  </div>
  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
  <h2 className="text-xl font-semibold text-slate-900">Attendance Management</h2>
  <p className="mt-2 text-sm text-slate-500">
    Update attendance percentage for students.
  </p>

  <div className="mt-6 space-y-4">
    <select
      value={attendanceForm.studentId}
      onChange={(e) =>
        setAttendanceForm({
          ...attendanceForm,
          studentId: e.target.value,
        })
      }
      className="w-full rounded-2xl border border-slate-200 px-4 py-3"
    >
      <option value="">Select student</option>
      {acceptedStudents.map((student) => (
        <option key={student.id} value={student.id}>
          {student.name} — {student.class_name}
        </option>
      ))}
    </select>

    <input
      type="number"
      min="0"
      max="100"
      value={attendanceForm.attendancePercent}
      onChange={(e) =>
        setAttendanceForm({
          ...attendanceForm,
          attendancePercent: e.target.value,
        })
      }
      placeholder="Attendance Percentage"
      className="w-full rounded-2xl border border-slate-200 px-4 py-3"
    />

    <button
      type="button"
      onClick={() => void submitAttendance()}
      disabled={postingAttendance}
      className="w-full rounded-2xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
    >
      {postingAttendance ? 'Updating...' : 'Update Attendance'}
    </button>

    {attendanceMessage && (
      <p className="text-sm text-slate-600">{attendanceMessage}</p>
    )}
  </div>
</div>
</div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Announcements</h2>
            <p className="mt-2 text-sm text-slate-500">
              Create a new school-wide announcement.
            </p>

            <div className="mt-6 space-y-4">
              <input
                type="text"
                value={announcementForm.title}
                onChange={(e) =>
                  setAnnouncementForm({ ...announcementForm, title: e.target.value })
                }
                placeholder="Announcement title"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              />
              <input
                type="text"
                value={announcementForm.audience}
                onChange={(e) =>
                  setAnnouncementForm({
                    ...announcementForm,
                    audience: e.target.value,
                  })
                }
                placeholder="Audience (e.g. parents, teachers)"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              />
              <textarea
                value={announcementForm.body}
                onChange={(e) =>
                  setAnnouncementForm({ ...announcementForm, body: e.target.value })
                }
                placeholder="Announcement body"
                className="h-32 w-full rounded-2xl border border-slate-200 px-4 py-3"
              />
              <button
                type="button"
                onClick={addAnnouncement}
                disabled={postingAnnouncement}
                className="w-full rounded-2xl bg-violet-700 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-800 disabled:opacity-60"
              >
                {postingAnnouncement ? 'Posting...' : 'Publish Announcement'}
              </button>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Recent announcements
              </h3>
              <div className="mt-4 space-y-3">
                {announcements.slice(0, 4).map((announcement) => (
                  <div key={announcement.id} className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">{announcement.title}</p>
                    <p className="text-sm text-slate-500">{announcement.audience}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-semibold text-slate-900">Current School Data</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Applications</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{totalApplications}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Students</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{students.length}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Classes</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{classes.length}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Announcements</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{announcements.length}</p>
          </div>
        </div>
      </section>
    </main>
  );
}