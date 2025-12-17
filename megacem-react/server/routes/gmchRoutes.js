import { Router } from 'express';
const router = Router();
import { addData, getData, updateData } from '../controllers/gmchControllers.js';

router.get('/gmch', getData);

router.post('/gmch/add', addData);

router.put('/api/v1/gmch/:id', updateData);

export default router;
