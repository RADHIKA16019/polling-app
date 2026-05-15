import Poll from "../models/Poll.js";
import Response from "../models/Response.js";

export const getAnalytics = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    const responses = await Response.find({ pollId: req.params.id });

    const totalResponses = responses.length;

    res.json({
      poll,
      totalResponses,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
