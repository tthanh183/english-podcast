import React from "react";

import { Button, IconButton } from "@material-tailwind/react";
const Banner = () => {
  return (
    <div className="w-full h-[600px] flex justify-between bg-gradient-to-br from-white to-green-500">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-[34rem] gap-6">
          <h1 className="text-8xl font-bold mb-4 text-green-600">
            Podcast English
          </h1>
          <p className="text-3xl">
            Learn English with our engaging and informative podcasts
          </p>
          <p className="text-base">
            Your ultimate destination for mastering English through engaging
            podcasts, available on your web browser, smartphone, or desktop.
            Learn anytime, anywhere—free of charge. Let your English skills
            soar!
          </p>
          <Button>Let's get started</Button>
          
        </div>
      </div>
    </div>
  );
};

export default Banner;
