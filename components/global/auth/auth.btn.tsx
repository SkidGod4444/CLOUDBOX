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
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be redirected to Auth page.Click on continue to proceed!
            Kindly join the telegram channel to get your cloud key.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Link href="https://t.me/cloudbox_storage">
            <AlertDialogCancel>Join Channel</AlertDialogCancel>
          </Link>
          <AlertDialogAction onClick={handleContinue}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
