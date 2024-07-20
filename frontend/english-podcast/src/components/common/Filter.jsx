import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Filter = ({ onSearch }) => {
  const [filter, setFilter] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFilter(value);
  };

  const handleSearchClick = () => {
    onSearch(filter);
  };

  return (
    <div className="flex w-full shrink-0 gap-2 md:w-max my-1">
      <div className="w-full md:w-72">
        <Input label="Search" onChange={handleInputChange} value={filter} />
      </div>
      <Button
        className="flex items-center gap-3 bg-green-500"
        size="sm"
        onClick={handleSearchClick}
      >
        <MagnifyingGlassIcon strokeWidth={2} className="h-4 w-4" /> Search
      </Button>
    </div>
  );
};

export default Filter;
