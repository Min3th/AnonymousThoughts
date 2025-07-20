import Image from "next/image";
import MyBox from "../components/box";
import ResponsiveAppBar from "../components/navbar";
import ThoughtBox from "../components/thoughtbox";

export default function Home() {
  const content = ["msdfdsf dsf32df df i sd lsd ", "iodds sdd ios vlfkjdf lsdsd", "rusof hdfieu hum i give ghut"];
  return (
    <>
      <ResponsiveAppBar />
      <MyBox>Hello worldwwwasdasdas...</MyBox>
      <MyBox sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {content.map((text, index) => (
          <ThoughtBox key={index}>{text}</ThoughtBox>
        ))}
      </MyBox>
    </>
  );
}
