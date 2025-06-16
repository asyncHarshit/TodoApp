import express from 'express';
import { addNewTask, getAllTasks } from '../controller/task.controller.js';


const router = express.Router();





router.post('/add',addNewTask);
router.get('/getTasks/:id',getAllTasks)

export default router