"use client";

import { useState, useEffect } from "react";

type Thought = {
    _id: string;
    topic: string;
    content: string;    
}

export default function useThoughts() {
    const [thoughts, setThoughts] = useState<Thought[]>([]);
    const [topic, setTopic] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchThoughts();
    }, []);

    const fetchThoughts = async () => {
        try {
            const response = await fetch("/api/thoughts");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setThoughts(data);
        } catch (err) {
      console.error("Error fetching thoughts:", err);
    }

    const addThought = async () => {
        if (!topic || !content) {
            setError("Topic and content cannot be empty");
            return;
        }

        try {
            const response = await fetch("/api/thoughts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ topic, content }),
            });

            if (!response.ok) {
                throw new Error("Failed to add thought");
            }

            const newThought = await response.json();
            setThoughts((prevThoughts) => [...prevThoughts, newThought]);
            setTopic("");
            setContent("");
            setError(null);
        } catch (err) {
            console.error("Error adding thoughts:", err);
        }
    }


    useEffect(() => {
        async function fetchThoughts() {
            try {
                const response = await fetch("/api/thoughts");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setThoughts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        }

        fetchThoughts();
    }, []);

    return { thoughts, loading, error };
}
