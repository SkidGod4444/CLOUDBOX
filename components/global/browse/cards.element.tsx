import React from "react";
import { CardHoverEffect } from "../../ui/card-hover-effect";
import SearchElement from "./search.element";

export default function CardsElement({
  item,
}: {
  item: {
    cid: string;
    title: string;
    description: string;
    link: string;
    img: string;
    isFolder: boolean;
    isFile: boolean;
    isNsfw: boolean;
  }[];
}) {
  return (
    <div className="flex flex-col mt-20 max-w-5xl mx-auto px-8">
      <SearchElement/>
      <CardHoverEffect items={item} />
    </div>
  );
}
