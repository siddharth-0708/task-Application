const express = require('express');
const task = require('../models/task.js')
const app = express();

const router = new express.Router()

router.post('/tasks',function(req,res){ //post is to create
    const taskData = new task.task(req.body) //creating the table
    taskData.save().then(function(){ 
        res.send(taskData)
    }).catch(function(e){
        res.status(400)
        res.send(e)
    })
}
)
module.exports = {
    router: router //exporting the router we created and it has all methods in it
}
