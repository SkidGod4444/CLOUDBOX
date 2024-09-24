"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    href: string;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathName = usePathname();

  return (
    <TooltipProvider>
      <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 ">
        <nav className="grid gap-3 py-0 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({
                        variant: link.href === pathName ? "default" : "ghost",
                        size: "icon",
                      }),
                      "h-9 w-9",
                      link.href === pathName &&
                        "bg-primary text-white hover:text-primary hover:bg-muted",
                      link.href !== pathName &&
                        "bg-muted hover:bg-primary hover:text-white",
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    {/* <span className="sr-only">{link.title}</span> */}
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4 text-white"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              // write the title of the link in bold if it is the current page
              <Link
                key={index}
                href={link.href}
                className={cn(
                  buttonVariants({
                    variant:
                      link.href === pathName ||
                      pathName.startsWith(link.href + "/")
                        ? "default"
                        : "ghost",
                    size: "default",
                  }),
                  link.href === pathName &&
                    "bg-primary text-white hover:text-primary hover:bg-muted",
                  "justify-start",
                  link.href !== pathName &&
                    "bg-muted hover:bg-primary hover:text-white",
                )}
              >
                <link.icon className="mr-2 h-5 w-5" />
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      link.variant === "default" &&
                        "text-background dark:text-white",
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            ),
          )}
          {/* <Separator /> */}

          {/* <div>
            <Button className="dark:bg-muted dark:text-primary dark:hover:bg-primary dark:hover:text-white">
              <FolderPlus className="mr-2 h-5 w-5" />
              <span>Add Folder</span>
            </Button>
          </div> */}
        </nav>
      </div>
    </TooltipProvider>
  );
}
