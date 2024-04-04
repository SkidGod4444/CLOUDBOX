import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Fingerprint } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { CheckUser, CreateUser, PushUser } from '@/db/functions';

export default function AuthBtn() {
  const [cloudKey, setCloudKey] = useState('');
  
  const handleContinue = () => {
    if (cloudKey.trim() !== '') {
      if (typeof window !== 'undefined') {
      localStorage.setItem('CloudKey', cloudKey);
      CreateUser(cloudKey)
      }
    }
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline">
          <Fingerprint className='h-5 w-5 mr-2 text-primary' /> Authenticate
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Authenticate</AlertDialogTitle>
          <AlertDialogDescription>
            Join our official Telegram channel and follow the steps. And enter your CloudKey & continue.
          </AlertDialogDescription>
          <Input placeholder="Enter Your CloudKey" value={cloudKey} onChange={(e) => setCloudKey(e.target.value)} />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Link href="https://t.me/cloudbox_storage">
            <AlertDialogCancel>Get CloudKey</AlertDialogCancel>
          </Link>
          <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
