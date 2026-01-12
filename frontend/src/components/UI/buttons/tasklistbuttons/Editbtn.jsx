import React from 'react'

const Editbtn = ({task, setEditbuttonclicked, setClickedTask}) => {

    const handleEditClick = (task) => {
        console.log(task)
        setEditbuttonclicked(task._id)
        setClickedTask(task.todotask)
    }

  return (
    <>
        <button className='px-5 py-3 bg-[#e0f7faa8] text-[#0077c2] rounded-md' onClick={() => handleEditClick(task)} >Edit</button>
    </>
  )
}

export default Editbtn