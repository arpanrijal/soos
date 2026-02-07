import { React, useState, lazy, Suspense } from 'react'
import TaskList from '../UI/List/TaskList'
import Navbar from '../UI/Nav_footer/Navbar'
import AddTaskBox from '../UI/InputBox/AddTaskBox'
import AddFileBox from '../UI/InputBox/AddFileBox'
import Footer from '../UI/Nav_footer/Footer'
import LoadingAnimation from '../UI/InputBox/LoadingAnimation'
import SharePublic_or_Private from '../UI/sharePublic_or_Private/SharePublic_or_Private'
// import FileList from '../UI/List/FileList'

const FileList = lazy(() => import('../UI/List/FileList'));

const FileUploadmanagement = () => {
  const [filechange, setFilechange] = useState(false)
  const [isshareTabVisible, setisshareTabVisible] = useState(false)
  const [shareLink, setshareLink] = useState('')
  return (
    <>
      <Navbar />
      <AddFileBox setFilechange={setFilechange} />
      <Suspense fallback={<div><LoadingAnimation /></div>}>
        <FileList setFilechange={setFilechange} filechange={filechange} setisshareTabVisible={setisshareTabVisible} setshareLink={setshareLink} />
      </Suspense>
      {isshareTabVisible && <SharePublic_or_Private shareLink={shareLink} setisshareTabVisible={setisshareTabVisible} />}
      {/* <Footer /> */}
    </>
  )
}

export default FileUploadmanagement