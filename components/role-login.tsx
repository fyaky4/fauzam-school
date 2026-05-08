'use client';

import React, { useState } from 'react';
import type { Role } from '@/lib/types';
import { getCurrentProfile, signInWithEmail } from '@/lib/supabase';

type Props = {
  role: Exclude<Role, null>;
  onLogin: (role: Exclude<Role, null>) => void;
};

export default function RoleLogin({ role, onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    const authData = await signInWithEmail(email, password);

    if (!authData) {
      setMessage('Invalid email or password.');
      setSubmitting(false);
      return;
    }

    const profile = await getCurrentProfile();

    if (!profile) {
      setMessage('Profile not found for this account.');
      setSubmitting(false);
      return;
    }

    if (profile.role !== role) {
      setMessage(`This account is registered as ${profile.role}, not ${role}.`);
      setSubmitting(false);
      return;
    }

    onLogin(profile.role);
    setSubmitting(false);
  };

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold capitalize">{role} Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in with your authorized school account.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            required
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl bg-violet-700 px-4 py-3 font-semibold text-white hover:bg-violet-800 disabled:opacity-60"
          >
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-red-600">{message}</p>
        )}
      </div>
    </main>
  );
}