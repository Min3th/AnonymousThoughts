"use client";
import { useState, useEffect } from "react";
import { useSnackbar } from "../utils/snackbar";

type Thought = {
  //   _id: string;
  topic: string;
  content: string;
  category: string;
};

export default function useThoughts() {
  const snackbar = useSnackbar();
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
  const fetchThoughtById = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/thoughts/${id}`);
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
        body: JSON.stringify({ topic: thought.topic, content: thought.content, category: thought.category }),
      });

      if (!response.ok) {
        throw new Error("Failed to add thought");
      }
      const data = await response.json();
      // snackbar.success("Thought added successfully, your id is: " + data.uniqueCode);
      return data;
    } catch (err) {
      snackbar.error("Error adding thought: " + err);
      console.error("Error adding thought:", err);
    }
  };

  const fetchCategory = async (category = "Love") => {
    const res = await fetch(`http://localhost:8080/api/thoughts?category=${category}`);
    console.log("Res", res);
    return await res.json();
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  return { loading, error, addThought, fetchThoughts, fetchCategory, fetchThoughtById };
}
