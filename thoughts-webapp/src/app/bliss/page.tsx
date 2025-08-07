"use client";
import MyBox from "../../components/box";
import ThoughtBox from "../../components/thoughtbox";
import useThoughts from "../requests/api";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

type Thought = {
  _id: string;
  __v: number;
  topic: string;
  content: string;
};

export default function Home() {
  const theme = useTheme();
  const currentMode = theme.palette.mode;
  console.log("Current theme mode:", currentMode);
  const [thoughtContent, setThoughtContent] = useState<Thought[]>([]);
  const { fetchCategory } = useThoughts();
  useEffect(() => {
    const loadThoughts = async () => {
      const loveThoughts = await fetchCategory("Bliss");
      console.log("Fetched love thoughts:", loveThoughts);
      setThoughtContent(loveThoughts);
    };
    loadThoughts();
  }, []);

  const heights = [100, 150, 200, 250, 300, 350, 400, 450, 500];

  const getRandomLightColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const lightness = currentMode === "dark" ? 30 : 85;
    return `hsl(${hue}, 100%, ${lightness}%)`;
  };

  return (
    <MyBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <MyBox
        sx={{
          fontSize: "1.5rem",
          fontFamily: "Georgia, serif",
          fontWeight: 500,
          textAlign: "center",
          mt: 2,
        }}
      >
        Bliss...
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
              <ThoughtBox backgroundColor={getRandomLightColor()} height={heights[index % heights.length]}>
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
