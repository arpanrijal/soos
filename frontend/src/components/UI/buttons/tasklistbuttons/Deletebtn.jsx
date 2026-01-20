import React from 'react'
import { Trash } from 'lucide-react';

const Deletebtn = ({ task, setChanges, sendStatus_file_or_todo, setFilechange }) => {
    const deleteTask = async (task, sendStatus_file_or_todo) => {
        if (sendStatus_file_or_todo === "tasktodo") {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete/${task._id}`, {
                    method: 'DELETE'
                })
                if (response.ok) {
                    setChanges(prev => !prev)
                }
            } catch (error) {
                console.error("Error During Deleting Task")
            }
        }
        if (sendStatus_file_or_todo === "file") {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ftp/deletefile/${task._id}/${task.filename}`, {
                    method: 'DELETE'
                })
                if (response.ok) {
                    setFilechange(prev => !prev)
                }
            } catch (error) {
                console.error("Error During Deleting Task")
            }
        }
    }

    return (
        <>
            <button className='p-2 w-10 h-10 bg-[#ffeaeac2] text-[#d10000] rounded-md flex flex-row justify-center items-center ' onClick={() => { deleteTask(task, sendStatus_file_or_todo) }}><Trash size={25}/></button>
        </>
    )
}

export default Deletebtn