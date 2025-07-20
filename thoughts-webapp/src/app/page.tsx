import Image from "next/image";
import MyBox from "./components/box";
import ResponsiveAppBar from "./components/navbar";
import ThoughtBox from "./components/thoughtbox";

export default function Home() {
  return (
    <>
      <ResponsiveAppBar />
      <MyBox>Hello worldwwwasdasdas...</MyBox>
      <ThoughtBox>Yo yo yo yo</ThoughtBox>
    </>
  );
}
