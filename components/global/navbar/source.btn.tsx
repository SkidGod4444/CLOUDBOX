import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useMediaQuery } from "react-responsive";

export default function SourceBtn() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Link href="https://github.com/SkidGod4444/CLOUDBOX">
      <Button variant="outline" size={isSmallScreen ? "icon" : "default"}>
        <Github
          className={
            isSmallScreen ? "h-5 w-5 text-primary" : "h-5 w-5 mr-2 text-primary"
          }
        />
        <span className="hidden md:inline">Open Source</span>
      </Button>
    </Link>
  );
}
