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

export default function FilterElement() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Browse using... " />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Choose any one</SelectLabel>
          <Separator className="mb-2"/>
          <SelectItem value="user">USER</SelectItem>
          <SelectItem value="title">TITLE</SelectItem>
          <SelectItem value="desc">DESCRIPTION</SelectItem>
          <SelectItem value="cloud-id">CLOUDBOX ID</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
