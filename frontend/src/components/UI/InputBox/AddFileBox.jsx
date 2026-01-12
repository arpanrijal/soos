import React, { useState, useRef, useEffect } from 'react'
import LoadingAnimation from './LoadingAnimation'

const AddFileBox = ({ setFilechange }) => {
  const [uploadFile, setUploadFile] = useState([])
  const [loadingAnimation, setloadingAnimation] = useState(false)
  const fileInputName = useRef(null)
  const inputfilehandler = (e) => {
    const newfile = Array.from(e.target.files).map(file => ({
      fileINFO: file,
      previewFileURL: URL.createObjectURL(file)
    }))
    if (newfile.length === 0) {
      setloadingAnimation(false)
      return
    }
    setloadingAnimation(true)
    setUploadFile(prevFile => [...prevFile, ...newfile])
    e.target.value = ""
    setloadingAnimation(false)
  }

  const removefilehandler = (index) => {
    if (index == -1) {
      setUploadFile([])
    } else {
      setUploadFile(prev => prev.filter((file, i) => {
        if (i === index) {
          URL.revokeObjectURL(file.previewFileURL)
          return false
        }
        return true
      }))//_ is used because we need to add something so the filter work (elem, index) and we need to add elem anyway so we have notthong to add so we add _
      // setUploadFile ley prev lai uploadFile ko all content dinxa due to prev is function and function ma sabbi pass gardinxa 
    }
  }

  const uploadHandler = async (UploadAllfile = false, filename = null) => {
    const formData = new FormData()
    if (UploadAllfile) {
      uploadFile.forEach((file) => {
        formData.append('uploaded_files', file.fileINFO)
      })

    } else {
      if (filename === null) return
      formData.append('uploaded_files', filename)
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ftp`, {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) {
        throw new Error("Failed to upload File")
      } else {
        setFilechange(prev => !prev)//yo chai file list component lai update garna lai ho
        if (!UploadAllfile) {
          setUploadFile(prev => prev.filter((f, i) => {
            if (f.fileINFO.name === filename.name) {
              URL.revokeObjectURL(f.previewFileURL)
              return false
            }
            return true
          }))
        } else {
          uploadFile.forEach(f => URL.revokeObjectURL(f.previewFileURL))
          setUploadFile([])
        }
      }
    } catch (err) {
      console.error('Problem occur during file uploading', err)
    }
  }

  return (
    <>
      <div className="w-full my-5 px-5">
        <div className="inputs flex !items-start flex-col !justify-start p-5 w-full bg-[#f0f8ff] rounded-xl shadow-[0_0_55px_rgba(0,0,0,0.15)]">
          <div className="title font-semibold text-xl items-center justify-center flex w-full pb-2">File Transfer</div>
          <div className='w-full h-[200px] flex text-wrap items-center justify-center border-dashed border-gray-500 rounded-md border-2'>
            <input type="file" ref={fileInputName} multiple onChange={inputfilehandler} />
          </div>
          <div className='w-[100%] py-3 px-2 gap-5 flex flex-wrap items-center justify-start'>
            {uploadFile.length > 0 && (
              <>
                <h2 className="py-2 font-bold w-full">Preview:</h2>
                <div>{loadingAnimation && <LoadingAnimation />}</div>
                {uploadFile.map((file, index) => (
                  !loadingAnimation && (
                    <div className='flex flex-col items-center bg-white h-[30%] drop-shadow-xl rounded-2xl pb-3 overflow-hidden' key={index}>
                      <img
                        src={file.previewFileURL}
                        alt='preview'
                        className='w-[100%] pb-2 h-52 object-cover'
                      />
                      <p className='px-2 pb-1 text-left w-[100%]'><b>File Name:</b><span> {file.fileINFO.name}</span></p>
                      <p className='px-2 py-3 text-left w-[100%]'><b>File Type:</b><span> {file.fileINFO.type}</span></p>
                      <button className='py-3 bg-[#abcef7] hover:cursor-pointer rounded-xl mt-2 w-[90%] font-medium text-[#0077ff] text-center' onClick={() => uploadHandler(false, file.fileINFO)}>Upload File</button>
                      <button className='py-3 bg-red-300 hover:cursor-pointer rounded-xl mt-2 w-[90%] font-medium text-red-500 text-center' onClick={() => removefilehandler(index)}>Remove File</button>
                    </div>
                  )
                )
                )}
                {uploadFile.length > 7 && (
                  <div className='flex gap-2 p-4 items-center justify-center w-[100%]'>
                    <button className='py-3 px-2 bg-[#abcef7] hover:cursor-pointer rounded-xl mt-2  font-medium text-[#0077ff] text-center' onClick={() => { uploadHandler(true) }}>Upload All Files</button>
                    <button className='py-3 px-2 bg-red-300 hover:cursor-pointer rounded-xl mt-2 font-medium text-red-500 text-center' onClick={() => removefilehandler(-1)}>Remove All Files</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AddFileBox