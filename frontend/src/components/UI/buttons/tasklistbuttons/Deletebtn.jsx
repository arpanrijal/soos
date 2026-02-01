import React, { useState } from 'react'
import { Trash } from 'lucide-react';
import LoadingAnimation from '../../InputBox/LoadingAnimation';

const Deletebtn = ({ task, setChanges, sendStatus_file_or_todo, setFilechange, btnLoad, setbtnLoad }) => {
    const deleteTask = async (task, sendStatus_file_or_todo) => {
        setbtnLoad(true)
        if (sendStatus_file_or_todo === "tasktodo") {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete/${task._id}`, {
                    method: 'DELETE'
                })
                if (response.ok) {
                    setChanges(prev => !prev)
                    setbtnLoad(false)
                }
            } catch (error) {
                setbtnLoad(false)
                console.error("Error During Deleting Task")
            }
        }
        if (sendStatus_file_or_todo === "file") {            
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ftp/deletefile?_id=${task._id}&public_id=${task.public_id}&mimetype=${task.mimetype}`, {
                    method: 'DELETE'
                })
                if (response.ok) {
                    setFilechange(prev => !prev)
                    setbtnLoad(false)
                }
            } catch (error) {
                setbtnLoad(false)
                console.error("Error During Deleting Task")
            }
        }
    }

    return (
        <>
            <button className={`p-2 w-10 h-10 rounded-md flex flex-row justify-center items-center ${btnLoad ? 'bg-[#E5E7EB] cursor-not-allowed text-[#9CA3AF]' : 'bg-[#ffeaeac2] text-[#d10000]'}`} onClick={() => { deleteTask(task, sendStatus_file_or_todo) }}>{btnLoad ? <LoadingAnimation/> :<Trash size={25}/>}</button>
        </>
    )
}

export default Deletebtn