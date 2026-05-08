import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { schoolName } from '@/lib/demo-data';
import { demoChild } from '@/lib/demo-data';

type Props = {
  onClose: () => void;
};

export default function ReportCardDownload({ onClose }: Props) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Download Report Card</DialogTitle>
          <DialogDescription>
            Preview of a downloadable report card document.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 rounded-2xl border p-6 text-sm">
          <div className="text-center">
            <div className="text-xl font-bold">{schoolName}</div>
            <div className="text-slate-500">Student Term Report</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Student:</span> {demoChild.name}
            </div>
            <div>
              <span className="font-medium">Class:</span> {demoChild.class_name}
            </div>
            <div>
              <span className="font-medium">Admission No:</span>{' '}
              {demoChild.admission_no}
            </div>
            <div>
              <span className="font-medium">Attendance:</span>{' '}
              {demoChild.attendance}%
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            className="bg-violet-700 hover:bg-violet-800"
            onClick={onClose}
          >
            Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}