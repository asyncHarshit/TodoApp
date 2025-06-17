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
        const {title , description , userId , status , priority,_id} = req.body;
        const updateTask = await Task.findByIdAndUpdate(_id,{
            title,
            description,
            userId,
            status,
            priority
        },{new : true})
        if(updateTask){
            return res.status(200).json({
                success : true,
                message : "Task Updated successfully",
                data : updateTask
            })

        }else{
            return res.status(201).json({
                success : false,
                message : "Error inn update Task",
                data : updateTask
            })

        }

    } catch (error) {
        return res.status(201).json({
                success : true,
                message : "All tasks shown",
                data : extractAllTask
            })
        
    }
}
const deleteTask = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success : false,
                message : "Tast id is required !!"
            })
        }
        const taskToBeDelete = await Task.findOneAndDelete(id);
        if(taskToBeDelete){
           return res.status(201).json({
                success : true,
                message : "Task deleted successfully !!"
            })
        }else{
            return res.status(400).json({
                success : false,
                message : "Not able to delete Task!!"
            })

        }


        
    } catch (error) {
        return res.status(201).json({
                success : true,
                message : "All tasks shown",
                data : extractAllTask
            })
        
    }
}





export {addNewTask,getAllTasks , deleteTask , updateTask}





// get all task by userId
// delete a task
// edit a task