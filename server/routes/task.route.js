import express from 'express';
import { addNewTask, getAllTasks , deleteTask, updateTask } from '../controller/task.controller.js';


const router = express.Router();





router.post('/add',addNewTask);
router.get('/getTasks/:id',getAllTasks)
router.delete('/deleteTask/:id',deleteTask)
router.put('/update',updateTask)

export default router