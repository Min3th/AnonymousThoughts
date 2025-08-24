"use client";
import MyBox from "../components/box";
import ThoughtBox from "../components/thoughtbox";
import useThoughts from "./requests/api";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { getRandomLightColor } from "@/components/randomColor";

type Thought = {
  _id: string;
  __v: number;
  topic: string;
  content: string;
};

export default function Home() {
  const theme = useTheme();
  const currentMode = theme.palette.mode;
  const [thoughtContent, setThoughtContent] = useState<Thought[]>([]);
  const { fetchThoughts } = useThoughts();
  useEffect(() => {
    const loadThoughts = async () => {
      const thoughts = await fetchThoughts();
      setThoughtContent(thoughts);
    };
    loadThoughts();
  }, []);

  return (
    <MyBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <MyBox
        sx={{
          fontSize: "1.5rem",
          fontFamily: "Georgia, serif",
          fontWeight: 500,
          textAlign: "center",
          mt: 8,
          mb: 8,
        }}
      >
        Dive into the thoughts of fellow humans...
      </MyBox>
      <MyBox
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          padding: 2,
          maxWidth: 1200,
        }}
      >
        <MyBox
          sx={{
            columnCount: { xs: 1, sm: 2, md: 3 },
            columnGap: 2,
            width: "100%",
            maxWidth: 1200,
          }}
        >
          {thoughtContent.map((thought, index) => (
            <MyBox
              key={thought._id}
              sx={{
                breakInside: "avoid",
                mb: 2,
              }}
            >
              <ThoughtBox backgroundColor={getRandomLightColor(currentMode)}>
                <div>
                  <strong>{thought.topic}</strong>
                  <p>{thought.content}</p>
                </div>
              </ThoughtBox>
            </MyBox>
          ))}
        </MyBox>
      </MyBox>
    </MyBox>
  );
}
