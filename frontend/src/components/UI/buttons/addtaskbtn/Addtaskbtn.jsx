import React from 'react'
import LoadingAnimation from '../../InputBox/LoadingAnimation'

const Addtaskbtn = ({btnLoad}) => {
    return (
        <div className='px-11 py-2 flex w-full justify-center'>
            <button type="submit" className={`py-3 rounded-xl gap-2 flex justify-center mt-2 w-[80%] font-medium text-center ${btnLoad ? 'bg-[#E5E7EB] cursor-not-allowed text-[#9CA3AF]' : 'bg-[#0077ff] hover:cursor-pointer text-white'}`} >{btnLoad && <LoadingAnimation />}Add Note</button>
        </div>
    )
}

export default Addtaskbtn