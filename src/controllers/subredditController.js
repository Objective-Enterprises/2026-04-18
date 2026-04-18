import {
  fetchAllSubreddits,
  createNewSubreddit,
  fetchSubredditWithThreads,
} from "../services/subredditService.js";

export const getAllSubreddits = async (req, res) => {
  try {
    const subreddits = await fetchAllSubreddits()
    if (subreddits.length === 0) {
      const output = { success: false, message: 'No subreddits found' }
      res.status(404).json(output)
    }
    const output = { success: true, data: subreddits, message: 'Subreddits found' }
    res.json(output)
  } catch (error) {
    const output = { success: false, message: 'Error finding subreddits' }
    res.status(500).json(output)
  }
};

export const createSubreddit = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        success: false,
        message: 'Name missing'
      })
    }
    if (!req.body.author) {
      return res.status(400).json({
        success: false,
        message: 'Author missing'
      })
    }
    const subreddit = await createNewSubreddit(
      req.body.name,
      req.body.description,
      req.body.author
    )
    if (!subreddit) {
      return res.status(409).json({
        success: false,
        message: 'Name taken'
      })
    }
    res.status(201).json({
      success: true,
      data: subreddit,
      message: "Subreddit created"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating subreddit'
    })
  }
};

export const getSubredditWithThreads = async (req, res) => {
  try {
    const subreddit = await fetchSubredditWithThreads(req.params.id)
    if (!subreddit) {
      return res.status(404).json({
        success: false,
        message: 'Subreddit not found'
      })
    }
    res.json({
      success: true,
      data: subreddit,
      message: 'Subreddit found'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting subreddit"
    })
  }
};
