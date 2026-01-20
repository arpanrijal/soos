import React from "react";
import { Download } from 'lucide-react';

const Downloadbtn = ({ task }) => {
  const handleDownload = () => {
    window.location.href =
      `${import.meta.env.VITE_BACKEND_URL}/ftp/download/${task._id}`;
  };

  return (
    <button
      className="p-2 w-[80%] h-10 bg-[#e0fae6bd] text-[#00c261] rounded-md flex flex-row justify-center items-center gap-1"
      onClick={handleDownload}
    ><Download size={25} /> Download
    </button>
  );
};

export default Downloadbtn;
