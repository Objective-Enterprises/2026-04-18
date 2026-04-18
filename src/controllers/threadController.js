import {
    fetchAllThreads,
    fetchThreadById,
    createNewThread,
    updateThread,
    deleteThread
} from '../services/threadService.js';

export const getAllThreads = async (req, res) => {
    try {
        const threads = await fetchAllThreads();
        if (threads.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No threads found'
            });
        }
        return res.json({
            success: true,
            data: threads,
            message: 'Threads found'
        });
    } catch (error) {
        console.error('Error finding threads:', error);
        return res.status(500).json({
            success: false,
            message: 'Error finding threads'
        });
    }
};

export const getThreadById = async (req, res) => {
    try {
        const thread = await fetchThreadById(req.params.id);
        if (!thread) {
            return res.status(404).json({
                success: false,
                message: 'Thread not found'
            });
        }
        return res.json({
            success: true,
            data: thread,
            message: 'Thread found'
        });
    } catch (error) {
        console.error('Error getting thread:', error);
        return res.status(500).json({
            success: false,
            message: 'Error getting thread'
        });
    }
};

export const createThread = async (req, res) => {
    try {
        const { title, content, author, subreddit } = req.body;
        if (!title || !content || !author || !subreddit) {
            return res.status(400).json({
                success: false,
                message: 'All fields (title, content, author, subreddit) are required'
            });
        }
        const thread = await createNewThread(title, content, author, subreddit);
        if (!thread) {
            return res.status(404).json({
                success: false,
                message: 'Subreddit not found'
            });
        }
        return res.status(201).json({
            success: true,
            data: thread,
            message: 'Thread created'
        });
    } catch (error) {
        console.error('Error creating thread:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating thread'
        });
    }
};

export const updateThreadHandler = async (req, res) => {
    try {
        const thread = await updateThread(req.params.id, req.body);
        if (!thread) {
            return res.status(404).json({
                success: false,
                message: 'Thread not found'
            });
        }
        return res.json({
            success: true,
            data: thread,
            message: 'Thread updated'
        });
    } catch (error) {
        console.error('Error updating thread:', error);
        return res.status(500).json({
            success: false,
            message: 'Error updating thread'
        });
    }
};

export const deleteThreadHandler = async (req, res) => {
    try {
        const thread = await deleteThread(req.params.id);
        if (!thread) {
            return res.status(404).json({
                success: false,
                message: 'Thread not found'
            });
        }
        return res.json({
            success: true,
            data: thread,
            message: 'Thread deleted'
        });
    } catch (error) {
        console.error('Error deleting thread:', error);
        return res.status(500).json({
            success: false,
            message: 'Error deleting thread'
        });
    }
};
