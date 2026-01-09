import { Router } from "express";
import { addToDO, deleteToDO, readToDo,updateToDO } from '../controller/todo.js'


const router = Router()

router.get('/todo', readToDo)
router.post('/todo', addToDO)
router.put('/todo/:id', updateToDO)
router.delete('/todo/:id', deleteToDO)


export default router