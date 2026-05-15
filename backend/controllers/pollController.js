import Poll from "../models/Poll.js";

import { io } from "../server.js";

export const createPoll = async (req, res) => {
  try {
    const { title, questions, isAnonymous, expiresAt } = req.body;

    if (!title || !questions.length) {
      return res.status(400).json({
        message: "Title and questions are required",
      });
    }

    const poll = await Poll.create({
      title,
      questions,
      isAnonymous,
      expiresAt,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      poll,
    });
  } catch (err) {
    // console.log("CREATE POLL ERROR:");
    // console.log(err);
    // console.log(err.message);

    res.status(500).json({
      message: err.message,
    });
  }
};

export const getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) return res.status(404).json({ message: "Poll not found" });


    if (new Date() > poll.expiresAt) {
      return res.status(403).json({ message: "Poll expired" });
    }

    res.json(poll);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const publishPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    poll.isPublished = true;

    await poll.save();

    res.json({
      message: "Results published",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const votePoll = async (req, res) => {
  try {
    const { answers } = req.body;

    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({
        message: "Poll not found",
      });
    }

    if (poll.expiresAt && new Date() > poll.expiresAt) {
      return res.status(400).json({
        message: "Poll expired",
      });
    }

    poll.questions.forEach((q, index) => {
      if (q.isMandatory && !answers[index]) {
        throw new Error(`Question ${index + 1} is mandatory`);
      }
    });

    Object.keys(answers).forEach((qIndex) => {
      const selectedOption = answers[qIndex];

      poll.questions[qIndex].options.forEach((option) => {
        if (option.text === selectedOption) {
          option.votes += 1;
        }
      });
    });

    poll.totalResponses += 1;

    poll.totalResponses += 1;
    await poll.save();

    io.to(req.params.id).emit("voteUpdated", poll);

    res.json({
      message: "Vote submitted",
      poll,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getMyPolls = async (req, res) => {
  try {
    const polls = await Poll.find({
      createdBy: req.user.id,
    });

    res.json(polls);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
