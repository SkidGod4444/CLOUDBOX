import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { MdOutlineSettings } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/user.context";
import { ClipboardCopy, LogOut } from "lucide-react";

const handleUnAuth = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("CloudKey");
    window.location.reload();
  }
};

const handleCopy = () => {
  if (typeof window !== "undefined") {
    const CloudKey = localStorage.getItem("CloudKey");
    if (CloudKey) {
      navigator.clipboard.writeText(CloudKey ?? "");
    }
  }
};

const cloudKeyValue = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("CloudKey") ?? "";
  }
};

export default function SettingsBtn() {
  const { toast } = useToast();
  const { current } = useUser();
  const [isNameTyping, setIsNameTyping] = useState(false);
  const [isName, setIsName] = useState<string>(current?.name ?? "");

  useEffect(() => {
    if (current?.name) {
      setIsNameTyping(true);
    }
  }, [current]);
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="icon">
          <MdOutlineSettings className="h-5 w-5 text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings?</DialogTitle>
          <DialogDescription>
            Share your Key with others to receive any file/folder seamlessly.
            For more help kindly join our telegram channel.
          </DialogDescription>
          <div className="flex flex-col my-10 items-start justify-center gap-2">
            <span className="text-sm font-bold">Name</span>
            <Input
              disabled={isNameTyping}
              type="text"
              placeholder="Enter Your Name"
              value={isName}
              onChange={(e) => setIsName(e.target.value)}
            />
            <span className="text-sm font-bold">Email</span>
            <Input
              disabled
              type="email"
              placeholder="User Email"
              value={current?.email}
            />
            <span className="text-sm font-bold">Key</span>
            <Input
              disabled
              type="text"
              placeholder="CloudKey Not Found!"
              value={cloudKeyValue()}
            />
          </div>
          {!isNameTyping ? (
            <Button onClick={handleUnAuth} type="submit" variant="secondary">
              Save Details
            </Button>
          ) : (
            <div className="flex flex-row gap-2 mt-10">
              <Button
                type="submit"
                onClick={() => {
                  handleCopy();
                  toast({
                    description: "Copied to clipboard!",
                  });
                }}
              >
                <ClipboardCopy className="h-5 w-5 mr-2" /> Copy Key
              </Button>
              <Button onClick={handleUnAuth} type="submit" variant="outline">
              <LogOut className="h-5 w-5 mr-2" /> Sign Out
              </Button>
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}