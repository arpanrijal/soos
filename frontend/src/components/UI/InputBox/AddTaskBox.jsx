import React, { useState } from 'react';
import Addtaskbtn from '../buttons/addtaskbtn/Addtaskbtn';

const AddTaskBox = ({setChanges}) => {
    const [input, setinput] = useState("")

    const formsubmitter = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ todotask: input }) //server ma const {todotask} = req.body
            })
            if (!response.ok) {
                throw new Error("Something went wrong sending data");
            }
            setinput("")
            setChanges(prev => !prev)
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    function formhandler(e) {
        setinput(e.target.value)
    }
    return (
        <>
            <div className="w-full my-5 px-5">
                <div className="inputs flex !items-start flex-col !justify-start p-5 w-full bg-[#f0f8ff] rounded-xl shadow-[0_0_55px_rgba(0,0,0,0.15)]">
                    <div className="title font-semibold text-xl items-center justify-center flex w-full">Note App</div>
                    <div className="titleoftask pb-2 font-semibold">Enter Note:</div>
                    <form onSubmit={formsubmitter} className="w-full">
                        <input
                            className="bg-transparent w-[98%] p-2 border-[1px] border-black"
                            type="text"
                            name="todotask"
                            required
                            value={input}
                            onChange={formhandler}
                            placeholder="To buy fry pan for cooking..."
                        />
                        <Addtaskbtn />
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddTaskBox;
