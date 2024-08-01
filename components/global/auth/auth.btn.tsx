import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Fingerprint } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { CreateUser } from "@/db/functions";
import { AuthFormCard } from "./auth.form";

export default function AuthBtn() {
  // const [cloudKey, setCloudKey] = useState('');

  const handleContinue = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/auth";
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline">
          <Fingerprint className="h-5 w-5 mr-2 text-primary" /> Sign In
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Note!</AlertDialogTitle>
          <AlertDialogDescription>
            You will be redirected to Auth page & join our official telegram
            channel to setup cloudbox. Click on continue to proceed!
          </AlertDialogDescription>

          {/* <Input placeholder="Enter Your CloudKey" value={cloudKey} onChange={(e) => setCloudKey(e.target.value)} /> */}
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Link href="https://t.me/cloudbox_storage">
            <AlertDialogAction>Join </AlertDialogAction>
          </Link>
          <AlertDialogAction onClick={handleContinue}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
