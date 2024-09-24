"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Compass,
  FileBox,
  FolderPlus,
  Share2,
  UploadCloud,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/user.context";
import AuthBtn from "../auth/auth.btn";

export default function MobBottomNavbar() {
  const pathName = usePathname();
  const { current } = useUser();
  return (
    <div className="fixed z-50 bottom-4 left-0 right-0 flex justify-center md:hidden lg:hidden">
      <div
        className={cn(
          "bg-background border-2 border-muted px-5 w-auto p-2 rounded-md",
        )}
      >
        {current ? (
          <div className="flex items-center justify-between gap-x-6">
            {/* Place other navbar items here */}
            <Link href="/">
              <Button
                variant="outline"
                size="icon"
                className={
                  pathName === "/"
                    ? "bg-primary text-white hover:text-primary hover:bg-muted"
                    : "bg-muted hover:bg-primary hover:text-white"
                }
              >
                <UploadCloud size={25} />
              </Button>
            </Link>

            <Link href="/browse">
              <Button
                variant="outline"
                size="icon"
                className={
                  pathName === "/browse"
                    ? "bg-primary text-white hover:text-primary hover:bg-muted"
                    : "bg-muted hover:bg-primary hover:text-white"
                }
              >
                <Compass size={25} />
              </Button>
            </Link>

            <Link href="/folders">
              <Button
                variant="outline"
                size="icon"
                className={
                  pathName === "/folders"
                    ? "bg-primary text-white hover:text-primary hover:bg-muted"
                    : "bg-muted hover:bg-primary hover:text-white"
                }
              >
                <FolderPlus size={25} />
              </Button>
            </Link>

            <Link href="/uploads">
              <Button
                variant="outline"
                size="icon"
                className={
                  pathName === "/uploads"
                    ? "bg-primary text-white hover:text-primary hover:bg-muted"
                    : "bg-muted hover:bg-primary hover:text-white"
                }
              >
                <FileBox size={25} />
              </Button>
            </Link>

            <Link href="/shares">
              <Button
                variant="outline"
                size="icon"
                className={
                  pathName === "/shares"
                    ? "bg-primary text-white hover:text-primary hover:bg-muted"
                    : "bg-muted hover:bg-primary hover:text-white"
                }
              >
                <Share2 size={25} />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-x-6">
            {/* Place other navbar items here */}
            <Link href="/">
              <Button
                variant="outline"
                size="icon"
                className={
                  pathName === "/"
                    ? "bg-primary text-white hover:text-primary hover:bg-muted"
                    : "bg-muted hover:bg-primary hover:text-white"
                }
              >
                <UploadCloud size={25} />
              </Button>
            </Link>

            <Link href="/browse">
              <Button
                variant="outline"
                size="icon"
                className={
                  pathName === "/browse"
                    ? "bg-primary text-white hover:text-primary hover:bg-muted"
                    : "bg-muted hover:bg-primary hover:text-white"
                }
              >
                <Compass size={25} />
              </Button>
            </Link>

            <AuthBtn />
          </div>
        )}
      </div>
    </div>
  );
}
