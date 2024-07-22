import React from "react";

const Subscribe = ({ isSub, handleSubscribe }) => {
  return (
    <button
      className={`text-base items-center h-12 font-semibold text-[#ddd] cursor-pointer shadow-[0_0.5rem_1rem_rgba(143,142,142,0.15)] px-[1.2rem] py-0 rounded-[0.4rem] border-[none] ${isSub ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-800'}`}
      onClick={handleSubscribe}
    >
      {isSub ? "Unsubscribe" : "Subscribe"}
      <span className="followers">&nbsp; 65.7K </span>
    </button>
  );
};

export default Subscribe;
