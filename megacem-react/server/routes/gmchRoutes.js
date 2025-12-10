import { Router } from 'express';
const router = Router();
import { addData, getData } from '../controllers/gmchControllers.js';

router.get('/gmch', getData);

router.post('/gmch/add', addData);

export default router;
