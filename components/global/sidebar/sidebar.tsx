"use client";

import { useState } from "react";

type Props = {};

import { Button } from "@/components/ui/button";

import { useWindowWidth } from "@react-hook/window-size";
import { Nav } from "./nav";
import { ChevronsLeft, ChevronsRight, Compass, FileBox, FolderPlus, Share2, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/user.context";
import { NavBarItems, PublicNavBarItems } from "@/db/constants";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {current} = useUser();
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 800;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className={cn("z-[20] relative min-w-[80px] h-full border-r-2 border-muted-forground px-2 py-20 bg-muted/60 backdrop-filter backdrop-blur-lg",
    mobileWidth && "hidden")}>
      {!mobileWidth && (
        <div className="absolute right-[-25px] top-13">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-md p-1 w-8 h-8"
          >
            {isCollapsed ? <ChevronsRight size={20} className="text-primary dark:hover:text-white" /> : <ChevronsLeft size={20} className="text-primary dark:hover:text-white"/>}
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={current ? NavBarItems : PublicNavBarItems}
      />
    </div>
  );
}