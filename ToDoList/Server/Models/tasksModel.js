const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({
    title:String,
    isDone:Boolean
});

module.exports = mongoose.model('task',TasksSchema,'Tasks');