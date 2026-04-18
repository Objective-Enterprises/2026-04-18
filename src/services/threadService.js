import Thread from "../models/Thread.js";
import Subreddit from "../models/Subreddit.js";

export const fetchAllThreads = async () => {
    const threads = await Thread.find()
        .populate('author')
        .populate('subreddit');
    return threads;
};

export const fetchThreadById = async (id) => {
    const thread = await Thread.findById(id)
        .populate('author')
        .populate('subreddit');
    return thread;
};

export const createNewThread = async (title, content, author, subreddit) => {
    const existingSubreddit = await Subreddit.findById(subreddit);
    if (!existingSubreddit) {
        return null;
    }
    const data = { title, content, author, subreddit };
    const thread = new Thread(data);
    await thread.save();
    return thread;
};

export const updateThread = async (id, updates) => {
    // Validate that thread exists before updating
    const existingThread = await Thread.findById(id);
    if (!existingThread) {
        return null;
    }

    // Restrict updates to title and content only
    const allowedUpdates = {};
    if (updates.title) allowedUpdates.title = updates.title;
    if (updates.content) allowedUpdates.content = updates.content;

    const thread = await Thread.findByIdAndUpdate(id, allowedUpdates, { new: true })
        .populate('author')
        .populate('subreddit');
    return thread;
};

export const deleteThread = async (id) => {
    // Validate that thread exists before deleting
    const existingThread = await Thread.findById(id);
    if (!existingThread) {
        return null;
    }
    const thread = await Thread.findByIdAndDelete(id);
    return thread;
};
