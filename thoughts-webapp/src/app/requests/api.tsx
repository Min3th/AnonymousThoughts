"use client";

import { useState, useEffect } from "react";

type Thought = {
  //   _id: string;
  topic: string;
  content: string;
};

export default function useThoughts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchThoughts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thoughts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data; // Assuming the API returns an array of thoughts
    } catch (err) {
      console.error("Error fetching thoughts:", err);
    }
  };

  const addThought = async (thought: Thought) => {
    if (!thought.topic || !thought.content) {
      setError("Topic and content cannot be empty");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/thoughts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: thought.topic, content: thought.content }),
      });

      if (!response.ok) {
        throw new Error("Failed to add thought");
      }
      setError(null);
    } catch (err) {
      console.error("Error adding thoughts:", err);
    }
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  return { loading, error, addThought, fetchThoughts };
}
