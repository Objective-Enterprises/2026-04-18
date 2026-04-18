import express from 'express';
import {
    getAllThreads,
    getThreadById,
    createThread,
    updateThreadHandler,
    deleteThreadHandler
} from '../controllers/threadController.js';

const router = express.Router();

router.get('/', getAllThreads);
router.get('/:id', getThreadById);
router.post('/', createThread);
router.put('/:id', updateThreadHandler);
router.delete('/:id', deleteThreadHandler);

export default router;
