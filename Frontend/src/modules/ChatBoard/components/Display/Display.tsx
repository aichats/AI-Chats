import React from "react";

export const Display = () => {
  return (
    <div className="h-[80%] bg-orange-50 p-4 overflow-y-auto flex items-center">
      <div className="w-[60%] h-[70%] border m-auto rounded-md flex justify-center  text-center items-center">
        <h3>No requests submitted yet</h3>
      </div>
    </div>
  );
};
