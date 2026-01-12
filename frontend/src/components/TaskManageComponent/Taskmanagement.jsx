import React, {useState} from 'react'
import TaskList from '../UI/List/TaskList'
import Navbar from '../UI/Nav_footer/Navbar'
import AddTaskBox from '../UI/InputBox/AddTaskBox'
import Footer from '../UI/Nav_footer/Footer'

const Tasklist = () => {
  const [changes, setChanges] = useState(false);
  return (
    <>
    <Navbar />
    <AddTaskBox setChanges={setChanges}/>
    <TaskList changes={changes} setChanges={setChanges}/>
    {/* <Footer /> */}
    </>
  )
}

export default Tasklist