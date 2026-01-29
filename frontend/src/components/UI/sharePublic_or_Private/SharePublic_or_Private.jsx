import React, { useState } from 'react'
import { Copy, X, Check } from "lucide-react";

const SharePublic_or_Private = ({ shareLink, setisshareTabVisible }) => {
    const [tickbox, settickbox] = useState(false)
    const copytextFunction = () => {
        settickbox(true)
        const text = document.getElementById('shareurl')
        navigator.clipboard.writeText(text.value)
        const ticktime = setInterval(() => {
            settickbox(false)
        }, 600);
        setTimeout(() => {
             clearInterval(ticktime);
        }, 700);
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3">

            <div className="absolute inset-0 bg-black/90"></div>
            <div className='absolute right-5 top-8 cursor-pointer' onClick={() => {
                setisshareTabVisible(false)
            }}>
                <X size={28} className="text-white" />
            </div>
            <div className="relative z-10 flex rounded-3xl bg-white gap-5 h-fit p-4 flex-col min-w-7xl w-[550px]">
                <h2 className="text-black font-semibold text-xl">Share Link</h2>
                <div className='flex gap-5 flex-row justify-center items-center'>
                    <input
                        type="text"
                        className="text-black bg-gray-100 rounded p-2 w-full"
                        value={`${import.meta.env.VITE_FRONTEND_URL}/${shareLink}`}
                        disabled
                        id='shareurl'
                    />
                   {tickbox ? <div className="inline-block p-2 bg-green-200 rounded-lg cursor-pointer">
                        <Check size={23} className='text-green-600'/>
                    </div> : <div className="inline-block p-2 bg-slate-200 rounded-lg cursor-pointer" onClick={() => {
                        copytextFunction()
                    }}>
                        <Copy size={23} />
                    </div>}
                </div>
                <div className="flex gap-2 text-lg text-black justify-start items-center">
                    <input type="checkbox" id="ckbxvlu" value="private" className="w-5 h-5 rounded-2xl" />
                    <label htmlFor="ckbxvlu">Create Private Link</label>
                </div>
            </div>
        </div>
    );
};


export default SharePublic_or_Private