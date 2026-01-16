import React, { useEffect, useState } from 'react'
import Deletebtn from '../buttons/tasklistbuttons/Deletebtn';
import Sharebtn from '../buttons/tasklistbuttons/Sharebtn';
import FormateSelector from '../FormatSelector/FormateSelector';
const FileList = ({ filechange, setFilechange }) => {
  const [files, setFiles] = useState([])

  useEffect(() => {
    const listHandler = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ftp`)
        const filedata = await response.json()
        if (response.ok) {
          setFiles(filedata.fileINFO)
        }
      } catch (err) {
        console.error(err, "Fetch error")
      }
    }
    listHandler()
  }, [filechange])

  return (
    <>
      <div className='w-full px-5 mt-12 pb-5'>
        <div className='bg-[#ede8ffb4] rounded-xl w-full p-5 flex justify-center items-start flex-col'>
          <h2 className='font-semibold text-xl'>File List</h2>
          {files.length != 0 ? (
            <ul>
              <div className='flex flex-row px-1 gap-6 flex-wrap w-full'>
                {Array.from(files).toReversed().map(file => (
                  <li key={file._id} className='overflow-hidden bg-white text-black font-semibold my-2 gap-3 rounded-3xl flex justify-between items-center flex-col drop-shadow-lg'>
                    <div className='max-w-7xl'>
                      {FormateSelector(file)}
                      {/* <img
                        src={file.fileURL}
                        alt="uploaded image"
                        className='w-[100%] pb-2 h-52 object-cover'
                      /> */}
                      <div className='px-2 text-xl w-[98%] flex flex-wrap break-all overflow-y-auto'>{file.filename.split('-').slice(1).join('-')}</div>
                      <div className='px-2'>
                        <span className='font-thin text-gray-400 text-sm pr-4'>Created at: {file.createdat}</span>
                        <span className='font-thin text-gray-400 text-sm pr-4'>Size: {file.size}<span className='font-thin text-gray-400 text-sm pr-4'> {file.size_text}</span></span>
                      </div>
                    </div>
                    <div className='flex h-full w-full justify-center items-center pb-3 pt-3 px-3 gap-5'>
                      <Deletebtn task={file} setFilechange={setFilechange} sendStatus_file_or_todo="file" />
                      <Sharebtn />
                    </div>
                  </li>
                ))}
              </div>
            </ul>) : (<p className='text-center mt-3 py-5 pl-3 w-full'>No Task is Created yet</p>)}
        </div>
      </div>

    </>
  )
}

export default FileList