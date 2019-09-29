var express = require('express');
var TasksRouter = express.Router();
const mongoose=require('mongoose');

require("../Models/tasksModel");

let TasksSchema = mongoose.model("task");

TasksRouter.get('/',(req,res,next)=>{
    res.send("Hello from TasksRouter")
});

//Get All Tasks
TasksRouter.get('/tasks',(req,res,next)=>{
    TasksSchema.find().then(documents => {
        res.status(200).json({
          message: "tasks fetch succefully",
          tasks: documents
        });
      });
});

//Get Single Task 
TasksRouter.get('/task/:id',(req,res,next)=>{
    TasksSchema.findOne({_id:req.params.id}).then(task => {
        if (task) {
          res.status(200).json(task);
        } else {
          res.status(404).json({ message: "task not found!" });
        }
      });
});

//Add Task
TasksRouter.post('/task',(req,res,next)=>{
    var task = new TasksSchema({
        title:req.body.title,
        isDone:req.body.isDone
    })
    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "Error":"Bad Data"
        });
    }else{
        task.save().then(createdTask => {
            res.status(201).json({
              message: "Task added successfully",
              taskId: createdTask._id
            });
        });
    }
});

//Delete Task
TasksRouter.delete('/task/:id',(req,res,next)=>{
    TasksSchema.remove({_id:req.params.id}).then(deletedTask => {
        console.log(deletedTask);
        res.status(200).json({ message: "Task deleted!" });
      });
});

//Delete All 
TasksRouter.delete('/tasks',(req,res,next)=>{
  TasksSchema.deleteMany().then(deletedTasks => {
      console.log(deletedTasks);
      res.status(200).json({ message: "Tasks deleted!" });
    });
});

//Update Task
TasksRouter.put('/task/:id',(req,res,next)=>{
  var task = req.body;
  var updTask = {};
  
  if(task.isDone){
      updTask.isDone = task.isDone;
  }
  
  if(task.title){
      updTask.title = task.title;
  }
  
  if(!updTask){
      res.status(400);
      res.json({
          "error":"Bad Data"
      });
  } else {
    TasksSchema.updateOne({_id:req.params.id},task).then(result => {
      res.status(200).json({ message: "Task Updated successful!" });
    });
  }
});
module.exports=TasksRouter;
