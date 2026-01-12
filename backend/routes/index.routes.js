const express = require('express')
const router = express.Router();
const userModel = require('../models/todotaskSchema')
const { year, month, day } = require('../controller/date_and_timehandler')
let dark = false;


router.get('/', async (req, res) => {
    const todo = await userModel.find();
    res.json({
        lists_todo: todo,
        isEmpty: todo.length === 0,
    })
})


router.post('/', async (req, res, next) => {
    try {
        const { todotask } = req.body
        await userModel.create({
            todotask: todotask.trim(),
            createdat: `${year}-${month}-${day}`,
            updatedat: null,
            shareid: null,
            status_file_or_todo: "todo_task",
        })
        res.status(200).json({ sucess: true, message: 'Task Added sucessfully' });
    } catch (error) {
        res.status(500).json({ sucess: false, message: 'Failed to Add Task' });
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await userModel.findByIdAndDelete(id)
        res.status(200).json({ sucess: true, message: 'Task Deleted sucessfully' });
    } catch (error) {
        res.status(500).json({ sucess: false, message: 'Failed to Delete Task' });
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const { updatetask } = req.body;
        const { id } = req.params;
        await userModel.findByIdAndUpdate(id, {
            todotask: updatetask,
            updatedat: `${year}-${month}-${day}`,
        })
        res.status(200).json({ success: true, message: "Task updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed Task updated" });
    }
})

router.get('/darkmode', (req, res) => {
    res.json({
        darkmode: dark,
    })
})

router.post('/darkmode', (req, res) => {
    dark = req.body.darkmodestatus;
    res.json({
        message: "Dark mode status received"
    })
})

router.get('/randomid', async (req, res) => {
    const { taskid } = req.params
    const status = await userModel.findById(taskid)
    if (status != null) {
        await userModel.findByIdAndUpdate(taskid, {
            shareid: Math.floor((Math.random() * 9000) + 1000)//Math.random()*(max-min)))+min ho

        })
    } else {

    }

})

module.exports = router