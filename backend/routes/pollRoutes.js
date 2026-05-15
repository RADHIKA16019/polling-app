import express from "express";
import {
  createPoll,
  getPoll,
  publishPoll,
  votePoll,
  getMyPolls,
} from "../controllers/pollController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createPoll);
router.get("/:id", getPoll);
router.post("/vote/:id", votePoll);
router.get("/my-polls", authMiddleware, getMyPolls);
router.put("/publish/:id", authMiddleware, publishPoll);
router.get("/:id", getPoll);

export default router;
