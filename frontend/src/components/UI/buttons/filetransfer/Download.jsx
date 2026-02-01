import React, {useState} from "react";
import { Download } from 'lucide-react';
import LoadingAnimation from "../../InputBox/LoadingAnimation";

const Downloadbtn = ({ task, btnLoad, setbtnLoad }) => {
  const handleDownload = () => {
    setbtnLoad(true)
    window.location.href =
      `${import.meta.env.VITE_BACKEND_URL}/ftp/download/${task._id}`;
      setTimeout(() => {
        setbtnLoad(false)
      }, 500);
  };

  return (
    <button
      className={`p-2 w-[80%] h-10 rounded-md flex flex-row justify-center items-center gap-2 ${btnLoad ? 'bg-[#E5E7EB] cursor-not-allowed text-[#9CA3AF]' : 'bg-[#e0fae6bd] text-[#00c261]'}`}
      onClick={handleDownload}
    >{btnLoad ? <LoadingAnimation/> :<Download size={25} />} Download
    </button>
  );
};

export default Downloadbtn;
