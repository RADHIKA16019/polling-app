import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams } from "react-router-dom";

export default function Analytics() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get(`/polls/analytics/${id}`);
    setData(res.data);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>

      <p>Total Responses: {data.totalResponses}</p>
    </div>
  );
}
