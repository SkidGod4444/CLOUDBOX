import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function FilterByElement() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Browse by... " />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Choose any one</SelectLabel>
          <Separator className="mb-2" />
          <SelectItem value="folders">FOLDERS</SelectItem>
          <SelectItem value="files">FILES</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
