import Image from "next/image";
import MyBox from "./components/box";
import ResponsiveAppBar from "./components/navbar";

export default function Home() {
  return (
    <>
      <ResponsiveAppBar />
      <MyBox>Hello worldwwwasdasdas...</MyBox>
    </>
  );
}
