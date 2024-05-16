import { Router } from 'express';
import { addToMyList, removeFromMyList, listMyItems } from '../controllers/myListController';

const router = Router();

router.post('/add', addToMyList);
router.post('/remove', removeFromMyList);
router.get('/list', listMyItems);

export default router;
