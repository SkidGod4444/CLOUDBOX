import { Button } from "@/components/ui/button";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { FaTelegram } from "react-icons/fa";
import Link from "next/link";
import React from "react";

export default function CommunityBtn() {
  return (
    <Link href="https://t.me/cloudbox_storage">
      <Button variant="outline" size="icon">
        <FaTelegram className="h-5 w-5 text-primary" />
      </Button>
    </Link>
  );
}
