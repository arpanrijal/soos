import React from 'react'

const Downloadbtn = ({task}) => {

    const DownloadBtn = async (task) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ftp/download/${task._id}`, {
                method: 'GET'
            })
            if (!response.ok) {
                throw new Error("something went wrong during download")
            }
            const data = await response.json()
            if(data.success){
                window.location.href = data.downloadUrl
            }
        } catch (error) {
            throw error
        }
    }

    return (
        <>
            <button className='px-5 py-3 bg-[#e0fae6bd] text-[#00c261] rounded-md' onClick={() => { DownloadBtn(task) }} >Download</button>
        </>
    )
}

export default Downloadbtn