import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreatePoll() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [questions, setQuestions] = useState([
    {
      questionText: "",
      required: true,
      // options: [{ text: "" }]
      options: [{ text: "", votes: 0 }],
    },
  ]);

  const [allowAnonymous, setAllowAnonymous] = useState(true);
  const [expiresAt, setExpiresAt] = useState("");

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", required: true, options: [{ text: "" }] },
    ]);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push({ text: "" });
    setQuestions(updated);
  };

  const updateQuestion = (index, value) => {
    const updated = [...questions];
    updated[index].questionText = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex].text = value;
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post("/polls/create", {
        title,
        questions,
        isAnonymous: allowAnonymous,
        expiryDate: expiresAt,
      });

      console.log("POLL CREATED:", res.data);

      toast.success("Poll Created!");

      navigate(`/poll/${res.data.poll._id}`);
    } catch (err) {
      console.log(err);

      toast.error("Error creating poll");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Poll</h1>

      <input
        className="w-full border p-2 mb-4"
        placeholder="Poll Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="border p-4 mb-4 bg-white">
          <input
            className="w-full border p-2 mb-2"
            placeholder="Question"
            value={q.questionText}
            onChange={(e) => updateQuestion(qIndex, e.target.value)}
          />

          {q.options.map((opt, oIndex) => (
            <input
              key={oIndex}
              className="w-full border p-2 mb-2"
              placeholder="Option"
              value={opt.text}
              onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
            />
          ))}

          <div className="flex gap-2">
            <button
              className="bg-yellow-400 px-3 py-1"
              onClick={() => addOption(qIndex)}
            >
              + Option
            </button>

            <button
              className="bg-red-500 text-white px-3 py-1"
              onClick={() => removeQuestion(qIndex)}
            >
              Remove Question
            </button>
          </div>
        </div>
      ))}

      <button
        className="bg-black text-white px-4 py-2 mb-4"
        onClick={addQuestion}
      >
        + Add Question
      </button>

      <div className="mb-4">
        <label>Allow Anonymous</label>
        <input
          type="checkbox"
          checked={allowAnonymous}
          onChange={() => setAllowAnonymous(!allowAnonymous)}
        />
      </div>

      <label className="block mb-2 font-semibold">
          Expiry Date
      </label>

      <input
        type="date"
        className="border p-2 mb-4 w-full"
        value={expiresAt}
        onChange={(e) => setExpiresAt(e.target.value)}
      />

      <button
        className="bg-yellow-400 w-full py-2 font-bold"
        onClick={handleSubmit}
      >
        Create Poll
      </button>
    </div>
  );
}
