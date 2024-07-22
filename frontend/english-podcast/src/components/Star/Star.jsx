import React from "react";

import { Button } from "@material-tailwind/react";
import { CiStar } from "react-icons/ci";

const Star = () => {
  return (
    <div>
      <Button className="flex gap-3 text-base items-center h-12 font-semibold text-[#ddd] cursor-pointer shadow-[0_0.5rem_1rem_rgba(143,142,142,0.15)] px-[1.2rem] py-0 rounded-[0.4rem] border-[none] bg-black hover:bg-gray-800">
        <CiStar />
        Star
      </Button>
    </div>
  );
};

export default Star;
