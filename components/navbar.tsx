'use client';

import { School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { navItems, schoolName } from '@/lib/demo-data';
import type { PageKey, Role } from '@/lib/types';

type NavBarProps = {
  page: PageKey;
  setPage: (page: PageKey) => void;
  role: Role;
  onLogout: () => void;
};

export default function NavBar({
  page,
  setPage,
  role,
  onLogout,
}: NavBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <button
          onClick={() => setPage('home')}
          className="flex items-center gap-3 text-left"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 shadow-sm">
            <School className="h-5 w-5 text-violet-700" />
          </div>

          <div>
            <div className="text-base font-bold text-slate-900">{schoolName}</div>
            <div className="text-xs text-slate-500">Kano, Nigeria</div>
          </div>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => {
            const isActive = page === item.key;

            return (
              <Button
                key={item.key}
                variant={isActive ? 'default' : 'outline'}
                className={
                  isActive
                    ? 'bg-violet-700 text-white hover:bg-violet-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:text-violet-700'
                }
                onClick={() => setPage(item.key)}
              >
                {item.label}
              </Button>
            );
          })}

          {role && (
            <Badge className="border border-violet-200 bg-violet-100 px-3 py-1 text-violet-800 hover:bg-violet-100">
              Logged in as {role}
            </Badge>
          )}

          {role && (
            <Button
              variant="outline"
              onClick={onLogout}
              className="border-slate-200 text-slate-700 hover:border-red-300 hover:text-red-600"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}