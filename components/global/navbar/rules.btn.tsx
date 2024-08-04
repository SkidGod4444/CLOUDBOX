import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookText, ShieldAlert, ShieldCheck } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function RulesBtn() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="icon">
          <BookText className="h-5 w-5 text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-row gap-2 text-primary">
            <ShieldCheck className="h-5 w-5" /> TERMS OF SERVICE
          </DialogTitle>
          <DialogDescription className="text-start">
            No matter what you have to follow our{" "}
            <strong className="text-primary">(TOS)</strong> inorder to use our
            services. By accessing or using cloud-box services you agree to be
            bound by these <strong className="text-primary">(TOS)</strong>. Read
            our <strong className="text-primary">(TOS)</strong> below carefully
            before using cloud-box services.
          </DialogDescription>
          <ScrollArea className="flex border-primary border rounded-md h-[120px] top-2 bg-transparent">
            <p className="text-white text-start text-sm p-2 mb-1">
              <strong className="text-primary">WHAT IS THIS?:</strong> Cloud-box
              is a cloud storage service built on top of Telegram. By using our
              service, you agree to{" "}
              <Link href="https://telegram.org/tos/">
                <strong className="text-blue-500">(Telegram TOS)</strong>
              </Link>{" "}
              & the following written bellow.
            </p>

            <p className="text-white text-start text-sm px-4 mb-1">
              <strong className="text-primary">USAGE-RESTRICTIONS:</strong> You
              are not responsible for your use of cloud-box and any content you
              upload, share, or store to telegram using our service. But we can
              track you and terminate your cloud-box account.
            </p>

            <p className="text-white text-start text-sm px-4 mb-1">
              <strong className="text-primary">CONTENT-RESTRICTIONS:</strong>{" "}
              You are free to upload anything (literally anything) you want.
              Every data is stored as it is in telegram privately.
            </p>

            <p className="text-white text-start text-sm px-4 mb-1">
              <strong className="text-primary">PUBLISHING-NSFW:</strong>{" "}
              Publicly shared files and folders containing 18+ content must be
              appropriately censored and enabled NSFW while uploading.
            </p>

            <p className="text-white text-start text-sm px-4 mb-1">
              <strong className="text-primary">LIMITATIONS:</strong> We do not
              have any type of limitations upload as much as you can but as per
              telegram we do have max file size limitation of 2GB/2000MB.
            </p>
          </ScrollArea>
          <span className="flex flex-row gap-2 text-primary text-lg font-semibold leading-none tracking-tight pt-4">
            <ShieldAlert className="h-5 w-5" /> VIOLATING OUR TOS
          </span>
          <DialogDescription className="text-start">
            We will delete your shared files/folders or may be your whole
            account at any time, without notice, for conduct that we believe
            violates these <strong className="text-primary">(TOS)</strong> or is
            harmful to other users of the service, us, or third parties, or for
            any other reason.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
