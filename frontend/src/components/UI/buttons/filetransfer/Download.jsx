import React from "react";

const Downloadbtn = ({ task }) => {
  const handleDownload = () => {
    window.location.href =
      `${import.meta.env.VITE_BACKEND_URL}/ftp/download/${task._id}`;
  };

  return (
    <button
      className="px-5 py-3 bg-[#e0fae6bd] text-[#00c261] rounded-md"
      onClick={handleDownload}
    >
      Download
    </button>
  );
};

export default Downloadbtn;
