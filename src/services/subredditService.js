import Subreddit from "../models/Subreddit.js";
import Thread from "../models/Thread.js";

export const fetchAllSubreddits = async () => {
  const subreddits = await Subreddit.find()
  return subreddits
};

export const createNewSubreddit = async (name, description, author) => {
  const existingSubreddit = await Subreddit.findOne({ name })
  if (existingSubreddit) {
    return
  }
  const data = { name, description, author }

  // v1
  // const subreddit = await Subreddit.create(data)

  // v2 
  const subreddit = new Subreddit(data)
  await subreddit.save()

  return subreddit
};

export const fetchSubredditWithThreads = async (id) => {
  const subreddit = await Subreddit.findById(id)
  if (!subreddit) {
    return
  }

  const threads = await Thread
    .find({ subreddit: id })
    .populate('author')

  return { subreddit, threads }
};
