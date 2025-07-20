import Image from "next/image";
import MyBox from "../components/box";
import ResponsiveAppBar from "../components/navbar";
import ThoughtBox from "../components/thoughtbox";
import Grid from "@mui/material/Grid";
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
  return (
    <>
      <ResponsiveAppBar />
      <MyBox
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          padding: 2,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Masonry columns={3} spacing={10}>
            {content.map((text, index) => (
              <ThoughtBox key={index}>{text}</ThoughtBox>
            ))}
          </Masonry>
        </Box>
      </MyBox>
    </>
  );
}
