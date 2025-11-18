import { Router } from 'express';
const router = Router();
import { getData } from '../controllers/gmchControllers';

router.get('/', getData);

export default router;
