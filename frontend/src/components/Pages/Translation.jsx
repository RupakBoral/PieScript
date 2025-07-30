import React from "react";
import Header from "../utils/Header";
import { Button } from "@/components/ui/button";

const Translation = () => {
  return (
    <div className="min-w-screen">
      <Header />
      <div className="relative z-20 w-4/5 mx-auto my-6 space-y-6 flex flex-col items-center">
        <h2 className="text-white/80 text-center text-xl">Translation</h2>
        <div className="space-x-4 w-5/6">
          <input
            className="text-white/60 border-2 border-white/55 w-[80%] p-4"
            type="text-area"
          />
          <Button
            type="submit"
            className="p-4 cursor-pointer h-12 w-fit bg-purple-700"
          >
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Translation;
