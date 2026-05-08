import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import type { MessageThread } from '@/lib/types';

type Props = {
  threads: MessageThread[];
  setThreads: React.Dispatch<React.SetStateAction<MessageThread[]>>;
};

export default function MessageCenter({ threads, setThreads }: Props) {
  const [replyText, setReplyText] = useState('');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

  const handleReply = () => {
    if (!replyText.trim() || !selectedThreadId) return;

    setThreads((current) =>
      current.map((thread) =>
        thread.id === selectedThreadId
          ? {
              ...thread,
              last_message: replyText,
              time: 'Just now',
            }
          : thread
      )
    );

    setReplyText('');
  };

  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Message Center</CardTitle>
        <CardDescription>Parent-teacher communication threads.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {threads.map((thread) => (
          <div key={thread.id} className="rounded-2xl border p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="font-semibold">{thread.subject}</div>
              <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">
                {thread.time}
              </Badge>
            </div>

            <div className="text-sm text-slate-500">
              Parent: {thread.parent} • Teacher: {thread.teacher}
            </div>

            <div className="mt-2 text-sm text-slate-700">
              {thread.last_message}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedThreadId(thread.id)}
              >
                Reply
              </Button>
            </div>

            {selectedThreadId === thread.id && (
              <div className="mt-3 space-y-2 rounded-2xl bg-slate-50 p-3">
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply"
                />

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-violet-700 hover:bg-violet-800"
                    onClick={handleReply}
                  >
                    Send Reply
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedThreadId(null);
                      setReplyText('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}