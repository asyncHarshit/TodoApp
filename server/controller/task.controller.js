import Task from "../model/Task.js";

// add a new task

const addNewTask = async(req,res)=>{
    const {title , description , userId , status , priority} = req.body;

    try {
        const newlyCreatedTask = await Task.create({
            title , description , userId , status , priority
        })
        if(newlyCreatedTask){
            return res.status(201).json({
                success : true,
                message : "Task Created Successfully"
            })
        }
        
    } catch (error) {
        res.json({
            success : false,
            message : "Error is add new Task in user controller"
        })
        console.log(error.message);
        
        
    }
}


// get all task

const getAllTasks = async(req,res)=>{
    try {
        const {id} = req.params;
        const extractAllTask = await Task.find({userId : id})

        if(extractAllTask){
            return res.status(201).json({
                success : true,
                message : "All tasks shown",
                data : extractAllTask
            })
        }

        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error in getting all task"
        })
        
    }
}
const updateTask = async(req,res)=>{
    try {
        

        
    } catch (error) {
        
    }
}
const deleteTask = async(req,res)=>{
    try {

        
    } catch (error) {
        
    }
}





export {addNewTask,getAllTasks}





// get all task by userId
// delete a task
// edit a task