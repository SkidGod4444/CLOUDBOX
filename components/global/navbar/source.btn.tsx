import { Button } from "@/components/ui/button";
import NumberTicker from "@/components/ui/number-ticker";
import { Github, Star } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const fetchStars = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/repos/SkidGod4444/CLOUDBOX",
      {
        next: {
          revalidate: 3600,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data.stargazers_count || 30; // Default value
    } else {
      return 30; // Default value
    }
  } catch (error) {
    console.error("Error fetching GitHub stars:", error);
    return 30; // Default value
  }
};

export default function SourceBtn() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const [stars, setStars] = useState(30); // Default value

  useEffect(() => {
    const getStars = async () => {
      const stars = await fetchStars();
      setStars(stars);
    };
    getStars();
  }, []);

  return (
    <Link href="https://github.com/SkidGod4444/CLOUDBOX" className="group">
      <Button variant="outline" size={isSmallScreen ? "icon" : "default"}>
        <Github
          className={
            isSmallScreen ? "h-5 w-5 text-primary" : "h-5 w-5 mr-2 text-primary"
          }
        />
        <span className="hidden md:inline">Star on GitHub</span>{" "}
        <div className="hidden ml-2 items-center gap-1 text-sm md:flex">
          <Star className="size-4 text-primary transition-all duration-300 group-hover:text-yellow-300" />
          <NumberTicker
            value={stars}
            className="font-display font-medium text-white"
          />
        </div>
      </Button>
    </Link>
  );
}
