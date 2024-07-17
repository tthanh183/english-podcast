import React from "react";
import { Button } from "@material-tailwind/react";
import {Link} from 'react-router-dom'
const Banner = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-gradient-to-br from-green-500 to-gray-50 p-4 md:p-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 text-green-600">
          Podcast English
        </h1>
        <p className="text-lg md:text-2xl lg:text-3xl mb-4">
          Learn English with our engaging and informative podcasts
        </p>
        <p className="text-sm md:text-base lg:text-lg mb-6">
          Your ultimate destination for mastering English through engaging
          podcasts, available on your web browser, smartphone, or desktop.
          Learn anytime, anywhere—free of charge. Let your English skills
          soar!
        </p>
        <Button size="lg"><Link to={'/home'}>Let's get started</Link></Button>
      </div>
    </div>
  );
};

export default Banner;
