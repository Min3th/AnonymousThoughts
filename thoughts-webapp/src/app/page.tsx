"use client";
import Image from "next/image";
import MyBox from "../components/box";
import ResponsiveAppBar from "../components/navbar";
import ThoughtBox from "../components/thoughtbox";
// import Grid from "@mui/material/Grid"; // Remove this line
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
// import Masonry from "@mui/lab/Masonry";
import useThoughts from "./requests/api";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

type Thought = {
  _id: string;
  __v: number;
  topic: string;
  content: string;
};

export default function Home() {
  const pathname = usePathname();
  const NoSSR_Masonry = dynamic(() => import("@mui/lab/Masonry"), {
    ssr: false,
  });
  const [thoughtContent, setThoughtContent] = useState<Thought[]>([]);
  const { loading, error, fetchThoughts } = useThoughts();
  useEffect(() => {
    const loadThoughts = async () => {
      const thoughts = await fetchThoughts();
      setThoughtContent(thoughts);
    };
    loadThoughts();
  }, []);

  const heights = [100, 150, 200, 250, 300, 350, 400, 450, 500];

  const getRandomLightColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 85%)`;
  };

  console.log("Thoughts content:", thoughtContent);

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
        <NoSSR_Masonry // remounts on theme or route change
          columns={3}
          spacing={2}
          key={pathname}
        >
          {thoughtContent.map((thought, index) => (
            <ThoughtBox
              key={thought._id}
              backgroundColor={getRandomLightColor()}
              height={heights[index % heights.length]}
            >
              <div>
                <strong>{thought.topic}</strong>
                <p>{thought.content}</p>
              </div>
            </ThoughtBox>
          ))}
        </NoSSR_Masonry>
      </MyBox>
    </MyBox>
  );
}
