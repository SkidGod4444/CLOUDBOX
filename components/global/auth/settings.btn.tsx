import { Button } from "@/components/ui/button";
import React, { useState } from "react";
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

export default function SettingsBtn() {
  const { toast } = useToast();
  const { current, signout } = useUser();
  const [isName, setIsName] = useState(false);
  const [isKey, setIsKey] = useState(false);
  const [isNsfw, setIsNsfw] = useState(false);
  const [nameValue, setNameValue] = useState<string>(current?.name ?? "");
  const [keyValue, setKeyValue] = useState<string>("");

  const handleCopy = () => {
    const CloudKey = "Lucifer is alive!"
    if (CloudKey) {
      navigator.clipboard.writeText(CloudKey ?? "");
    }
  };

  const handleSave = async () => {
    //lol
  };

  const handleSignOut = async () => {
    await signout();
    toast({
      description: "Signed Out successfully!",
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleIsNsfw = async () => {
    if (isNsfw) {
      // await SignIsNsfw("false");
      setIsNsfw(false);
      toast({
        description: "You are now safe from NSFW contents.",
      });
      // window.location.reload();
    } else {
      // await SignIsNsfw("true");
      setIsNsfw(true);
      toast({
        description: "You can now access NSFW contents.",
      });
      // window.location.reload();
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="icon">
          <MdOutlineSettings className="h-5 w-5 text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Share your Key with others to receive any file/folder seamlessly.
            For more help kindly join our telegram channel.
          </DialogDescription>
          <div className="flex flex-col my-10 items-start justify-center gap-2">
            <span className="text-sm font-bold">Name</span>
            <Input
              disabled={isName}
              type="text"
              placeholder="Enter your name"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            />
            <span className="text-sm font-bold">Email</span>
            <Input
              disabled
              type="email"
              placeholder="Enter your email"
              value={current?.email}
            />
            <span className="text-sm font-bold">Key</span>
            <Input
              disabled={isKey}
              type="text"
              placeholder="Enter your cloud key"
              value={keyValue}
              onChange={(e) => setKeyValue(e.target.value)}
            />
          </div>
          {!(isName && isKey) ? (
            <span className="text-sm text-muted-foreground my-5">
              Be careful you can&apos;t change your details again.
            </span>
          ) : null}
          {!(isName && isKey) ? (
            <Button onClick={handleSave} type="submit" variant="secondary">
              Save Details
            </Button>
          ) : (
            <div className="flex flex-row gap-2 mt-10">
              <div className="flex flex-row items-center py-4 gap-2 bg-secondary rounded-md h-[40px] w-[140px] px-2">
                <span className="text-sm font-bold text-primary">NSFW:</span>
                <Button
                  variant={isNsfw ? "default" : "outline"}
                  size="sm"
                  onClick={handleIsNsfw}
                >
                  {isNsfw ? "Enabled" : "Disabled"}
                </Button>
              </div>
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
              <Button
                onClick={handleSignOut}
                type="submit"
                variant="outline"
                className="ml-auto"
              >
                <LogOut className="h-5 w-5 mr-2" /> Sign Out
              </Button>
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
