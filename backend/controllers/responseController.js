import Poll from "../models/Poll.js";
import Response from "../models/Response.js";

export const submitResponse = async (req, res) => {
  try {
    const { pollId, answers } = req.body;

    const poll = await Poll.findById(pollId);

    if (!poll) return res.status(404).json({ message: "Poll not found" });

    if (new Date() > poll.expiresAt) {
      return res.status(403).json({ message: "Poll expired" });
    }

    const response = await Response.create({
      pollId,
      userId: poll.allowAnonymous ? null : req.user?.id,
      answers,
    });

    for (let ans of answers) {
      const question = poll.questions.id(ans.questionId);

      const option = question.options.find(
        (o) => o.text === ans.selectedOption,
      );

      if (option) option.votes += 1;
    }

    await poll.save();

    req.io.emit("pollUpdated", poll);

    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
