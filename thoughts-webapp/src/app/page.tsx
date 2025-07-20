import Image from "next/image";
import MyBox from "../components/box";
import ResponsiveAppBar from "../components/navbar";
import ThoughtBox from "../components/thoughtbox";
// import Grid from "@mui/material/Grid"; // Remove this line
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import Masonry from "@mui/lab/Masonry";

export default function Home() {
  const content = [
    "msdfdsf dsf32df df i sd lsd ",
    "iodds sdd ios vlfkjdf lsdsd",
    "rusof hdfieu hum i give ghut",
    "msdfdsf dsf32df df i sd lsd ",
    "iodds sdd ios vlfkjdf lsdsd",
    "rusof hdfieu hum i give ghut",
    "shetty fdfs is dfds",
  ];

  const heights = [100, 150, 200, 250, 300, 350, 400, 450, 500];

  const getRandomLightColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 85%)`;
  };
  return (
    <MyBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <ResponsiveAppBar />
      <MyBox
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          padding: 2,
        }}
      >
        <Masonry columns={3} spacing={2}>
          {content.map((text, index) => (
            <ThoughtBox backgroundColor={getRandomLightColor()} height={heights[index % heights.length]}>
              {text}
            </ThoughtBox>
          ))}
        </Masonry>
      </MyBox>
    </MyBox>
  );
}
