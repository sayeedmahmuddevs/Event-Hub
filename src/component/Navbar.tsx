import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function Navbar() {
  return (
    <div className="bg-gray-200">
      <div className="container mx-auto w-[1240px] ">
        <div className="w-full flex justify-between items-center px-4 py-2 ">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="w-12"
            />
            <h1>Event Hub</h1>
          </div>

          <div>
            <span>Up-coming Events</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Past Events</span>
            <Button variant="default" size="sm">Login </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
