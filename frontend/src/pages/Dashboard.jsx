import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();

  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const res = await API.get("/polls/my-polls");

      setPolls(res.data);
    } catch (err) {
      console.log(err);

      toast.error("Error fetching polls");
    }
  };

  const copyLink = (id) => {
    navigator.clipboard.writeText(`${window.location.origin}/poll/${id}`);

    toast.success("Link copied!");
  };

  const publishResult = async (id) => {
    try {
      await API.put(`/polls/publish/${id}`);

      toast.success("Results published");

      fetchPolls();
    } catch (err) {
      console.log(err);

      toast.error("Publish failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-black">Dashboard</h1>

          <p className="mt-2 text-gray-600">
            Welcome to your polling dashboard.
          </p>
        </div>

        <button
          onClick={() => navigate("/create-poll")}
          className="bg-yellow-400 px-5 py-3 font-bold rounded"
        >
          Create Poll
        </button>
      </div>

      <div className="grid gap-5">
        {polls.length === 0 ? (
          <div className="border p-6 rounded">No polls created yet.</div>
        ) : (
          polls.map((poll) => (
            <div key={poll._id} className="border p-5 rounded-xl shadow">
              <h2 className="text-2xl font-bold">{poll.title}</h2>

              <p className="mt-2">Questions: {poll.questions.length}</p>

              <p>Responses: {poll.totalResponses || 0}</p>

              <p>Status: {poll.isPublished ? "Published" : "Draft"}</p>

              <div className="mt-4 p-3 bg-gray-100 rounded text-sm break-all">
                 {window.location.origin}/poll/{poll._id}
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => navigate(`/poll/${poll._id}`)}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Open
                </button>

                <button
                  onClick={() => copyLink(poll._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Share
                </button>

                {!poll.isPublished && (
                  <button
                    onClick={() => publishResult(poll._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Publish
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
