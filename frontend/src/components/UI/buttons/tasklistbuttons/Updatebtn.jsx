import React, {useState} from 'react'
import LoadingAnimation from '../../InputBox/LoadingAnimation'
const Updatebtn = ({ task, setEditbuttonclicked, setClickedTask, clickedTask, setEdittakisemptyalert, setChanges }) => {

    const [btnLoad, setbtnLoad] = useState(false)
    const updateTask = async (task) => {
        setbtnLoad(true)
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
                setbtnLoad(false)
                setChanges(prev => !prev)
            }
        } catch (error) {
            setbtnLoad(false)
            console.error("Error During Updating Task")
        }
    }

    return (
        <>
            <button className={`px-5 py-3 rounded-md ${btnLoad ? 'bg-[#E5E7EB] cursor-not-allowed text-[#9CA3AF]' : 'bg-[#e0f7fabd] text-[#0077c2]'}`} onClick={() => { updateTask(task) }} >{btnLoad ? <LoadingAnimation /> : "Update"}</button>
        </>
    )
}

export default Updatebtn