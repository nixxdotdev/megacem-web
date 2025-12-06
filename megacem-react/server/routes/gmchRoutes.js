import { Router } from 'express';
const router = Router();
import { getData } from '../controllers/gmchControllers.js';

router.get('/gmch', getData);

export default router;
