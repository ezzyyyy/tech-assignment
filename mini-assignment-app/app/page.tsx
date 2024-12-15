'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/react/lib/Dashboard';
import XHR from '@uppy/xhr-upload';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

function createUppy() {
  return new Uppy({
    autoProceed: false,
    restrictions: { maxFileSize: 1000000, maxNumberOfFiles: 1 },
  }).use(XHR, { endpoint: 'http://localhost:8000/upload' });
}

export default function App() {
  const [uppy] = useState(createUppy);
  const router = useRouter();

  uppy.on('complete', (result: any) => {
    toast.success('Upload complete!');
    // console.log(result.successful[0].response.body);
    setTimeout(() => {
      router.push(`post/${(result as any).successful[0].response.body.id}`);
    }, 1000);
  });

  return (
    <div className="flex justify-center items-center">
      <Toaster richColors />
      <Card className="w-[800px] mt-6">
        <CardHeader>
          <CardTitle>Tech Assessment</CardTitle>
          <CardDescription>Please upload your .csv file.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="CSV">CSV File</Label>
            <Dashboard uppy={uppy} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
