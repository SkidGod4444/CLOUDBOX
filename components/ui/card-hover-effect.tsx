"use client";
import { Eye, File, Folder, Share } from "lucide-react";
import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Skeleton } from "./skeleton";
import { useUser } from "@/context/user.context";
import { useToast } from "./use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CardHoverEffect = ({
  items,
  className,
}: {
  items: {
    cid: string;
    title: string;
    description: string;
    link: string;
    img: string;
    isFolder: boolean;
    isFile: boolean;
    isNsfw: boolean;
    shares?: number;
  }[];
  className?: string;
}) => {
  const { toast } = useToast();
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isCensored, setIsCensored] = useState(false);
  const { current } = useUser();

  const handleCopy = (key: string) => {
    if (key) {
      navigator.clipboard.writeText(key ?? "");
      toast({
        description: "Copied to clipboard!",
      });
    }
  };

  useEffect(() => {
    if (current?.prefs?.["is-nsfw"] === "false" || undefined) {
      setIsCensored(true);
    } else {
      setIsCensored(false);
    }
  }, [current]);
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className,
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?.cid}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-primary block rounded-xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>

          <Card>
            <div className="flex flex-row justify-between">
              {item.isFile && <File className="h-12 w-12" />}
              {item.isFolder && <Folder className="h-12 w-12" />}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleCopy(item.cid)}
                    >
                      CID - {item.cid}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white">
                    <p className="text-black">Copy to clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {item.isNsfw && isCensored ? (
              <CardTitle>NSFW!</CardTitle>
            ) : (
              <CardTitle>{item.title}</CardTitle>
            )}
            {item.isNsfw && isCensored ? (
              <div className="space-y-2 mt-5">
                <Skeleton className="h-4 md:w-[250px] w-full" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            ) : (
              <CardDescription>{item.description}</CardDescription>
            )}
            <div className="flex flex-row justify-between items-center mt-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="ghost">
                      <Share className="h-4 w-4 mr-2" />
                      120
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white">
                    <p className="text-black">120 Shares</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {current ? (
                <Dialog>
                  <DialogTrigger>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="sm" variant="outline">
                            Send to me
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-white">
                          <p className="text-black">Send to yourself</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Share with others</DialogTitle>
                      <DialogDescription>
                        Enter the user cloud-key to share this file/folder. This
                        action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                          Link
                        </Label>
                        <Input
                          id="link"
                          type="number"
                          placeholder="Enter the user's key"
                        />
                      </div>
                      <Button type="submit" size="sm" className="px-3">
                        <span>Send</span>
                      </Button>
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center">
                      <span className="text-sm text-muted-foreground font-bold">
                        OR
                      </span>
                    </div>
                    <Button type="submit" size="sm" className="px-3">
                      <span>Send to me</span>
                    </Button>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button disabled size="sm" variant="outline">
                  Sign In to access
                </Button>
              )}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl cursor-pointer h-[300px] w-full p-4 overflow-hidden bg-muted border-2 border-transparent group-hover:bg-black group-hover:border-primary relative z-20 flex flex-col",
        className,
      )}
    >
      <div className="relative z-50 flex-1">{children}</div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-zinc-100 font-bold tracking-wide mt-8 text-start",
        className,
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "text-zinc-400 tracking-wide leading-relaxed text-sm mt-5 text-start",
        className,
      )}
    >
      {children}
    </p>
  );
};
