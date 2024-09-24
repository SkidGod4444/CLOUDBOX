import React from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
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
import Link from "next/link";

export default function AuthBtn() {
  const handleContinue = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/auth";
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline">
          <LogIn className="h-5 w-5 mr-2 text-primary" /> Sign In
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be redirected to Auth page. Click on continue to proceed!
            Kindly join the telegram channel to get your cloud key.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex flex-row justify-between mt-2 gap-5">
            <Link href="https://t.me/cloudbox_storage">
              <AlertDialogAction>Join Channel</AlertDialogAction>
            </Link>
            <AlertDialogAction onClick={handleContinue}>
              Continue
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
