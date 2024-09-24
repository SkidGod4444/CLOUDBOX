import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import FilterElement from "./filter.element";
import FilterByElement from "./filterby.element";
import { Search } from "lucide-react";

export default function SearchElement() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Label className="flex md:flex-row p-2 bg-black flex-col w-full rounded-xl gap-2 items-center">
        <div className="relative w-full">
          <Input
            placeholder="Browse public files & folders..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </div>
        <div className="flex flex-row gap-2">
          <FilterByElement />
          <FilterElement />
        </div>
      </Label>
    </div>
  );
}
