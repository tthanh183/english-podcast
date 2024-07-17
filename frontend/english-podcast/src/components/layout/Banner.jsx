import React from 'react';
import banner from '../../assets/image.png';

const Banner = () => {
  return (
    <div className='w-full h-[600px] flex justify-between bg-gradient-to-b from-black to-red-500'>
      <div className='relative w-full h-full'>
        <div className='absolute inset-0 flex flex-col justify-center items-center text-center px-[34rem] gap-6'>
          <h1 className='text-8xl font-bold mb-4 text-red-800'>Podcast English</h1>
          <p className='text-3xl'>Learn English with our engaging and informative podcasts</p>
          <p className='text-base'>Your ultimate destination for mastering English through engaging podcasts, available on your web browser, smartphone, or desktop. Learn anytime, anywhere—free of charge. Let your English skills soar!</p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
