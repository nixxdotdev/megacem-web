import { Router } from 'express';
const router = Router();
import { addData, deleteData, getData, updateData } from '../controllers/gmchControllers.js';

router.get('/gmch', getData);

router.post('/gmch/add', addData);

router.put('/gmch/update/:id', updateData);

router.delete('/gmch/delete/:id', deleteData);

export default router;
