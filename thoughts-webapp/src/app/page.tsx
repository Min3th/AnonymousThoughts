"use client";
import MyBox from "../components/box";
import ThoughtBox from "../components/thoughtbox";
import useThoughts from "./requests/api";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { getRandomLightColor } from "@/components/randomColor";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import ThoughtsImg from "../../public/images/thinking.png";

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
  const [selectedThought, setSelectedThought] = useState<Thought | null>(null);

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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mt: 8,
          mb: 30,
          textAlign: "center",
        }}
      >
        <Image src={ThoughtsImg} alt="Thoughts" width={400} height={400} />

        <MyBox
          sx={{
            fontSize: "1.5rem",
            fontFamily: "Georgia, serif",
            fontWeight: 500,
          }}
        >
          Dive into the thoughts of fellow humans. Share your own and see what others are thinking!
        </MyBox>
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
                width: "100%",
                cursor: "pointer",
              }}
              onClick={() => setSelectedThought(thought)}
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
      <Modal
        open={!!selectedThought}
        onClose={() => setSelectedThought(null)}
        aria-labelledby="thought-modal-title"
        aria-describedby="thought-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MyBox
          sx={{
            bgcolor: getRandomLightColor(currentMode),
            p: 4,
            borderRadius: 1,
            boxShadow: 24,
            borderColor: getRandomLightColor(currentMode),
            maxWidth: "600px",
            width: "90%",
            textAlign: "center",
            border: "0 px",
          }}
        >
          {selectedThought && (
            <>
              <h2 id="thought-modal-title">{selectedThought.topic}</h2>
              <p id="thought-modal-description">{selectedThought.content}</p>
            </>
          )}
        </MyBox>
      </Modal>
    </MyBox>
  );
}
