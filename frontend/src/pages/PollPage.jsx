import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-hot-toast";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PollPage() {
  const { id } = useParams();

  const [poll, setPoll] = useState(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selected, setSelected] = useState({});

  const [timeLeft, setTimeLeft] = useState(30);

  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    fetchPoll();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      nextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const fetchPoll = async () => {
    try {
      const res = await API.get(`/polls/${id}`);

      setPoll(res.data);
    } catch (err) {
      console.log(err);

      toast.error("Error fetching poll");
    }
  };

  const handleSelect = (optionText) => {
    setSelected({
      ...selected,
      [currentQuestion]: optionText,
    });
  };

  const nextQuestion = async () => {
    if (currentQuestion === poll.questions.length - 1) {
      submitVote();
      return;
    }

    setCurrentQuestion((prev) => prev + 1);

    setTimeLeft(30);
  };

  const submitVote = async () => {
    try {
      await API.post(`/polls/vote/${id}`, {
        answers: selected,
      });

      toast.success("Vote Submitted!");
      setQuizFinished(true);
      fetchPoll();
    } catch (err) {
      console.log(err);

      toast.error("Vote Error");
    }
  };

  if (!poll) {
    return <div>Loading...</div>;
  }

  const q = poll.questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* TITLE */}
      <h1 className="text-4xl font-black mb-6">{poll.title}</h1>

      <div className="flex justify-between mb-4">
        <div className="font-semibold">
          Question {currentQuestion + 1} / {poll.questions.length}
        </div>

        <div className="text-red-500 font-bold">⏳ {timeLeft}s</div>
      </div>

      <div className="border rounded-xl p-6 shadow">
        <h2 className="text-2xl font-bold mb-5">{q.questionText}</h2>

        <div className="space-y-3">
          {q.options.map((opt, index) => (
            <label
              key={index}
              className="flex items-center gap-3 border p-3 rounded cursor-pointer hover:bg-gray-100"
            >
              <input
                type="radio"
                name={currentQuestion}
                onChange={() => handleSelect(opt.text)}
              />

              <span>{opt.text}</span>
            </label>
          ))}
        </div>

        <button
          onClick={nextQuestion}
          className="mt-6 bg-yellow-400 px-6 py-3 rounded font-bold"
        >
          {currentQuestion === poll.questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>

      {poll.isPublished && (
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-6">Live Analytics</h2>

          {poll.questions.map((question, qIndex) => (
            <div key={qIndex} className="border rounded-xl p-5 mb-6">
              <h3 className="text-xl font-semibold mb-4">
                {question.questionText}
              </h3>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={question.options}>
                  <XAxis dataKey="text" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="votes" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6">
                <h4 className="font-bold text-lg mb-2">Leaderboard</h4>

                {[...question.options]
                  .sort((a, b) => b.votes - a.votes)
                  .map((opt, i) => (
                    <div key={i} className="flex justify-between border-b py-2">
                      <span>
                        #{i + 1} {opt.text}
                      </span>

                      <span>{opt.votes} votes</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
