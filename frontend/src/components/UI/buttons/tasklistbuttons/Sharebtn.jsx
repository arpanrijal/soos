import React, { useEffect, useState } from 'react'
import { Share } from 'lucide-react';

const Sharebtn = ({ task, sendStatus_file_or_todo, isPublic = true, setisshareTabVisible, setshareLink }) => {
  const details = async () => {
    const stat = isPublic ? 'public' : 'private';
    const responsee = await fetch(`${import.meta.env.VITE_BACKEND_URL}/share/${task._id}/${stat}`)
    const ress = await responsee.json();
    if (ress.status === 'failed') {
      return
    }
    setisshareTabVisible(true)
    setshareLink(ress.shareLink)
  }
  return (
    <>
      <button className='p-2 w-10 h-10 bg-[#ede8ffb4] text-[#8B5CF6] rounded-md flex justify-center items-center' onClick={() => {
        details();
      }}><Share size={25} /></button>
    </>
  )
}

export default Sharebtn