import React from 'react'

const Updatebtn = ({task, setEditbuttonclicked, setClickedTask, clickedTask, setEdittakisemptyalert, setChanges}) => {

    const updateTask = async (task) => {
        if (clickedTask.length === 0) {
            setEdittakisemptyalert(task._id)
            return
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/update/${task._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ updatetask: clickedTask })
            })
            if (response.ok) {
                setEditbuttonclicked(null)
                setClickedTask("")
                setEdittakisemptyalert(null)
                setChanges(prev => !prev)
            }
        } catch (error) {
            console.error("Error During Updating Task")
        }
    }

    return (
        <>
            <button className='px-5 py-3 bg-[#e0f7fabd] text-[#0077c2] rounded-md' onClick={() => { updateTask(task) }} >Update</button>
        </>
    )
}

export default Updatebtn