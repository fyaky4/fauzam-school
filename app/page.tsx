'use client';

import React, { useEffect, useState } from 'react';
import NavBar from '@/components/navbar';
import HomePage from '@/components/home-page';
import AboutPage from '@/components/about-page';
import AdmissionsPage from '@/components/admissions-page';
import ParentPortal from '@/components/parent-portal';
import RoleLogin from '@/components/role-login';
import ContactPage from '@/components/contact-page';
import TeacherWorkspace from '@/components/teacher-workspace';
import AdminPage from '@/components/admin-page';
import GalleryPage from '@/components/gallery-page';
import ProgramsPage from '@/components/programs-page';

import type {
  AnnouncementItem,
  ApplicationItem,
  ClassRecord,
  MessageThread,
  PageKey,
  Role,
  StudentRecord,
} from '@/lib/types';

import {
  getCurrentProfile,
  listAnnouncements,
  listApplications,
  listStudents,
  listClasses,
  signOutUser,
  supabase,
} from '@/lib/supabase';

export default function Page() {
  const [page, setPage] = useState<PageKey>('home');
  const [role, setRole] = useState<Role>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [classes, setClasses] = useState<ClassRecord[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [threads, setThreads] = useState<MessageThread[]>([]);

  useEffect(() => {
    void (async () => {
      const [apps, anns, studs, cls, profile] = await Promise.all([
        listApplications(),
        listAnnouncements(),
        listStudents(),
        listClasses(),
        getCurrentProfile(),
      ]);

      setApplications(apps);
      setAnnouncements(anns);
      setStudents(studs);
      setClasses(cls);

      const userRole = profile?.role ?? null;
      setRole(userRole);

      // ✅ Auto redirect after login
      if (userRole === 'parent') setPage('portal');
      if (userRole === 'admin') setPage('admin');
      if (userRole === 'teacher') setPage('teacher');

      setLoadingAuth(false);
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void (async () => {
        const profile = await getCurrentProfile();
        const userRole = profile?.role ?? null;

        setRole(userRole);

        // ✅ Auto redirect on auth change
        if (userRole === 'parent') setPage('portal');
        if (userRole === 'admin') setPage('admin');
        if (userRole === 'teacher') setPage('teacher');
      })();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await signOutUser();

    setRole(null);
    setPage('home');

    setApplications([]);
    setStudents([]);
    setAnnouncements([]);
    setClasses([]);
  };

  if (loadingAuth) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-slate-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <NavBar page={page} setPage={setPage} role={role} onLogout={handleLogout} />

      {page === 'home' && <HomePage setPage={setPage} />}
      {page === 'about' && <AboutPage />}

      {page === 'admissions' && (
        <AdmissionsPage setApplications={setApplications} />
      )}

      {page === 'portal' &&
        (role === 'parent' ? (
          <ParentPortal />
        ) : (
          <div className="mx-auto max-w-md text-center py-10">
            <p className="mb-4 text-slate-600">
              You must login as a parent to access this page.
            </p>
            <RoleLogin role="parent" onLogin={() => setPage('portal')} />
          </div>
        ))}

      {page === 'admin' &&
        (role === 'admin' ? (
          <AdminPage
            applications={applications}
            setApplications={setApplications}
            students={students}
            setStudents={setStudents}
            classes={classes}
            announcements={announcements}
            setAnnouncements={setAnnouncements}
          />
        ) : (
          <div className="mx-auto max-w-md text-center py-10">
            <p className="mb-4 text-slate-600">
              You must login as admin to access this page.
            </p>
            <RoleLogin role="admin" onLogin={() => setPage('admin')} />
          </div>
        ))}

      {page === 'teacher' &&
        (role === 'teacher' ? (
          <main className="mx-auto max-w-6xl px-4 py-10">
            <TeacherWorkspace threads={threads} setThreads={setThreads} />
          </main>
        ) : (
          <div className="mx-auto max-w-md text-center py-10">
            <p className="mb-4 text-slate-600">
              You must login as a teacher to access this page.
            </p>
            <RoleLogin role="teacher" onLogin={() => setPage('teacher')} />
          </div>
        ))}

      {page === 'contact' && <ContactPage />}
      {page === 'gallery' && <GalleryPage />}
      {page === 'programs' && <ProgramsPage setPage={setPage} />}
    </div>
  );
}