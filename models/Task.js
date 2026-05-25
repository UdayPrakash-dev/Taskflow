const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User',
        },
        title:{
            type:String,
            required:[true, 'Task title is required'],
            trim:true,
        },
        description:{
            type:String,
            trim:true,
            default:'', //optional field
        },
        completed:{
            type:Boolean,
            default:false,
        },
    },
    {
        timestamps:true,
    }
);

const Task = mongoose.model('Task',taskSchema);

module.exports = Task;