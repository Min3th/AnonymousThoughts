"use client";
import { useState } from "react";
import useThoughts from "../requests/api";

const ThoughtsPage = () => {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const { loading, error, addThought } = useThoughts();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("I am here");
    e.preventDefault();
    alert(`Topic: ${topic}\nContent: ${content}`);
    await addThought({
      topic,
      content,
    }); // Call the addThought function from useThoughts
    // You can replace this with an API call
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Submit a Thought</h2>

        <div>
          <label className="block mb-1 font-medium">Thought Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Thought Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows={5}
            required
          />
        </div>

        <button
          onSubmit={handleSubmit}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ThoughtsPage;
