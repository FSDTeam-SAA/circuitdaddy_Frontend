"use client";
import Image from "next/image";
import React from "react";

const StateCard = ({
  title,
  value,
  image,
}: {
  title: string;
  value: string;
  image: string;
}) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between h-[122px]">
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <h1 className="font-bold text-3xl">{value}</h1>
      </div>

      <div>
        <Image
          src={image}
          alt="state.png"
          width={1000}
          height={1000}
          className="h-10 w-10"
        />
      </div>
    </div>
  );
};

export default StateCard;
