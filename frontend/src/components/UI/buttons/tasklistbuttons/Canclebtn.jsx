import React from 'react'

const Canclebtn = ({setEditbuttonclicked, setClickedTask, setEdittakisemptyalert}) => {

    const handleCancleTask = () => {
        setEditbuttonclicked(null)
        setClickedTask("")
        setEdittakisemptyalert(null)
    }

  return (
    <>
        <button className='px-5 py-3 ml-3 bg-[#ffeaeac5] text-[#d10000] rounded-md' onClick={handleCancleTask}>Cancle</button>
    </>
  )
}

export default Canclebtn