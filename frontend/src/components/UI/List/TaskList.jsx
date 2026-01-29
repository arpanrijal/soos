import React, { useState, useEffect } from 'react'
import Editbtn from '../buttons/tasklistbuttons/Editbtn';
import Updatebtn from '../buttons/tasklistbuttons/Updatebtn';
import Canclebtn from '../buttons/tasklistbuttons/Canclebtn';
import Deletebtn from '../buttons/tasklistbuttons/Deletebtn';
import Sharebtn from '../buttons/tasklistbuttons/Sharebtn';

const TaskList = ({ changes, setChanges }) => {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [editbuttonclicked, setEditbuttonclicked] = useState(null)
    const [clickedTask, setClickedTask] = useState("")
    const [edittakisemptyalert, setEdittakisemptyalert] = useState(null)

    const Editformhandler = (e) => {
        setClickedTask(e.target.value)
    }

    useEffect(() => {
        async function GetTaskList() {
            try {

                const task_list = await fetch(`${import.meta.env.VITE_BACKEND_URL}`)
                const data = await task_list.json()//list_todo ko obj aauxa
                setTasks(data.lists_todo);
            }
            catch (err) {
                console.error("Error during Fetching Details")
            } finally {
                setLoading(false)
            }
        }
        GetTaskList();
    }, [changes]);
    return (
        <>
            <div className='w-full px-5 mt-12 pb-5'>
                <div className='bg-[#ede8ffb4] rounded-xl w-full p-5'>
                    <h2 className='font-semibold text-xl'>Note List</h2>
                    {loading ? (<p className='text-center mt-3 py-5'>Loading...</p>) : (
                        tasks.length != 0 ? (
                            <ul>
                                {tasks.toReversed().map(task => (
                                    <li key={task._id} className='w-full px-5 bg-white text-black font-semibold my-3 rounded-3xl flex justify-between items-center drop-shadow-lg'>
                                        <div className='w-full'>
                                            {editbuttonclicked === task._id ? (
                                                <>
                                                    <textarea type="text"
                                                        autoFocus
                                                        required
                                                        value={clickedTask}
                                                        onChange={(e) => Editformhandler(e)}
                                                        className='border-0 border-b-2 border-gray-900 focus:outline-none pt-5 text-lg w-[95%] max-h-96 min-h-min' />
                                                </>
                                            ) : (
                                                <>
                                                    <div className='pt-5 text-xl w-[98%] flex flex-wrap break-all overflow-y-auto max-h-60'>{task.todotask}</div>
                                                </>
                                            )}
                                            <div className='py-3'>
                                                <span className='font-thin text-gray-400 text-sm pr-4'>Created at: {task.createdat}</span>
                                                {task.updatedat != null && (<span className='font-thin text-gray-400 text-sm pb-3'>Updated at: {task.updatedat}</span>)}
                                                {edittakisemptyalert === task._id && (
                                                    <>
                                                        <div className='w-[40%] bg-red-200 text-red-800 border-l-2 border-red-500 py-2 text-sm font-normal rounded-md'>
                                                            <p className='pl-2'>Please Enter at least 1 character</p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className='flex h-full items-center gap-3'>
                                            {editbuttonclicked === task._id ? (
                                                <>
                                                    <Updatebtn task={task} setEditbuttonclicked={setEditbuttonclicked} setClickedTask={setClickedTask} clickedTask={clickedTask} setEdittakisemptyalert={setEdittakisemptyalert} setChanges={setChanges} />
                                                    <Canclebtn setEditbuttonclicked={setEditbuttonclicked} setClickedTask={setClickedTask} setEdittakisemptyalert={setEdittakisemptyalert} />
                                                </>
                                            ) : (
                                                <>
                                                    <Editbtn task={task} sendStatus_file_or_todo={"todo"} setEditbuttonclicked={setEditbuttonclicked} setClickedTask={setClickedTask} />
                                                    <Deletebtn task={task} setChanges={setChanges} sendStatus_file_or_todo="tasktodo"/>
                                                    <Sharebtn />
                                                </>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>) : (<p className='text-center mt-3 py-5'>No Task is Created yet</p>)
                    )}
                </div>
            </div>
        </>
    )
}

export default TaskList