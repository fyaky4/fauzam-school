'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Bell } from 'lucide-react';
import jsPDF from 'jspdf';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { timetable } from '@/lib/demo-data';
import { getParentPortalData } from '@/lib/supabase';
import type { ChildView } from '@/lib/types';

export default function ParentPortal() {
  const [child, setChild] = useState<ChildView | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const data = await getParentPortalData();
      setChild(data);
      setLoading(false);
    })();
  }, []);

  const average = useMemo(() => {
    if (!child || child.grades.length === 0) return 0;

    const total = child.grades.reduce((sum, item) => sum + item.score, 0);
    return Math.round(total / child.grades.length);
  }, [child]);

  const balance = child ? child.amount_due - child.amount_paid : 0;

  const paymentPercent =
    child && child.amount_due > 0
      ? Math.round((child.amount_paid / child.amount_due) * 100)
      : 0;

  const downloadReportCard = () => {
    if (!child) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Fauzam International Academy', 20, 20);

    doc.setFontSize(11);
    doc.text('Student Report Card', 20, 30);

    doc.setFontSize(12);
    doc.text(`Student Name: ${child.name}`, 20, 50);
    doc.text(`Class: ${child.class_name}`, 20, 60);
    doc.text(`Admission No: ${child.admission_no}`, 20, 70);
    doc.text(`Gender: ${child.gender}`, 20, 80);
    doc.text(`Attendance: ${child.attendance}%`, 20, 90);
    doc.text(`Fee Status: ${child.fee_status}`, 20, 100);

    doc.setFontSize(13);
    doc.text('Academic Performance', 20, 120);

    let y = 135;

    doc.setFontSize(11);
    doc.text('Subject', 20, y);
    doc.text('Score', 100, y);
    doc.text('Grade', 140, y);

    y += 8;
    doc.line(20, y, 180, y);
    y += 8;

    child.grades.forEach((item) => {
      doc.text(item.subject, 20, y);
      doc.text(`${item.score}%`, 100, y);
      doc.text(item.grade, 140, y);
      y += 10;
    });

    y += 8;
    doc.text(`Average Score: ${average}%`, 20, y);

    y += 12;
    doc.text(`Amount Due: NGN ${child.amount_due.toLocaleString()}`, 20, y);
    y += 10;
    doc.text(`Amount Paid: NGN ${child.amount_paid.toLocaleString()}`, 20, y);
    y += 10;
    doc.text(`Balance: NGN ${balance.toLocaleString()}`, 20, y);

    doc.save(`${child.name.replaceAll(' ', '_')}_Report_Card.pdf`);
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-slate-600">Loading parent portal...</p>
        </div>
      </main>
    );
  }

  if (!child) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Parent Portal</h2>
          <p className="mt-3 text-slate-600">
            No student data found for this parent account.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-6 py-12 lg:px-8">
      <section className="rounded-3xl bg-gradient-to-r from-purple-800 via-violet-700 to-fuchsia-600 p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold lg:text-4xl">Parent Portal</h1>
        <p className="mt-3 max-w-2xl text-sm text-purple-100">
          Monitor your child’s academic progress, fee status, and school updates.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Student Profile</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm text-slate-700">
            <div>
              <strong>Name:</strong> {child.name}
            </div>
            <div>
              <strong>Class:</strong> {child.class_name}
            </div>
            <div>
              <strong>Admission No:</strong> {child.admission_no}
            </div>
            <div>
              <strong>Gender:</strong> {child.gender}
            </div>
            <div>
              <strong>Attendance:</strong> {child.attendance}%
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl lg:col-span-2">
          <CardHeader>
            <CardTitle>Academic Snapshot</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-violet-50 p-4">
                <div className="text-sm text-slate-500">Average Score</div>
                <div className="text-2xl font-bold">{average}%</div>
              </div>

              <div className="rounded-2xl bg-amber-50 p-4">
                <div className="text-sm text-slate-500">Attendance</div>
                <div className="text-2xl font-bold">{child.attendance}%</div>
              </div>
            </div>

            {child.grades.length === 0 ? (
              <p className="text-sm text-slate-500">No grades available yet.</p>
            ) : (
              child.grades.map((subject) => (
                <div key={subject.subject}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>
                      {subject.subject} ({subject.grade})
                    </span>
                    <span>{subject.score}%</span>
                  </div>
                  <Progress value={subject.score} className="h-3" />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Report Card</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {child.grades.length === 0 ? (
              <p className="text-sm text-slate-500">No report card data yet.</p>
            ) : (
              child.grades.map((subject) => (
                <div
                  key={subject.subject}
                  className="flex justify-between rounded-2xl border p-4"
                >
                  <span>{subject.subject}</span>
                  <span className="font-medium">
                    {subject.score}% ({subject.grade})
                  </span>
                </div>
              ))
            )}

            <Button
              className="w-full bg-violet-700 hover:bg-violet-800"
              onClick={downloadReportCard}
              disabled={child.grades.length === 0}
            >
              Download Report Card
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Fee Status</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4 font-medium">
              {child.fee_status}
            </div>

            <div className="text-sm text-slate-600">
              Due: ₦{child.amount_due.toLocaleString()}
              <br />
              Paid: ₦{child.amount_paid.toLocaleString()}
              <br />
              Balance: ₦{balance.toLocaleString()}
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Payment Progress</span>
                <span>{paymentPercent}%</span>
              </div>
              <Progress value={paymentPercent} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle>Weekly Timetable</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-3">
          {timetable.map((day) => (
            <div key={day.day} className="rounded-2xl bg-slate-50 p-4">
              <div className="font-semibold">{day.day}</div>
              <div className="mt-1 text-sm text-slate-600">
                {day.items.join(' • ')}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {child.notices.length === 0 ? (
            <p className="text-sm text-slate-500">No notifications yet.</p>
          ) : (
            child.notices.map((notice) => (
              <div
                key={notice}
                className="flex gap-3 rounded-2xl bg-slate-50 p-4"
              >
                <Bell className="mt-1 h-4 w-4 text-violet-700" />
                <span className="text-sm">{notice}</span>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </main>
  );
}