import { Button } from "@/components/ui/button";
import React from "react";
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

const handleUnAuth = () => {
  localStorage.removeItem("CloudKey");
  window.location.reload();
};

const CloudKey = localStorage.getItem("CloudKey");

const handleCopy = () => {
  navigator.clipboard.writeText(CloudKey ?? "");
};

export default function SettingsBtn() {
  const { toast } = useToast();
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
            Share your CloudKey with others to receive any file/folder
            seamlessly.
          </DialogDescription>
          <Input
            disabled
            type="text"
            placeholder="CloudKey Not Found!"
            value={CloudKey ?? ""}
          />
          <Button
            type="submit"
            onClick={() => {
              handleCopy();
              toast({
                description: "Copied to clipboard!",
              });
            }}
          >
            Copy
          </Button>
          <Button onClick={handleUnAuth} type="submit" variant="outline">
            UnAuthorize
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
