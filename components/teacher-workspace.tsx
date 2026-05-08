import React from 'react';
import type { MessageThread } from '../lib/types';

type Props = {
  threads: MessageThread[];
  setThreads: React.Dispatch<React.SetStateAction<MessageThread[]>>;
};

export default function TeacherWorkspace({ threads, setThreads }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teacher Workspace</h1>
      <p>Teacher workspace content goes here.</p>
      <p>Threads: {threads.length}</p>
    </div>
  );
}