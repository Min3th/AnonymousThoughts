import { ReactNode } from "react";
import MyBox from "./box";

type ThoughtBoxProps = {
  children: ReactNode;
  backgroundColor?: string;
  height?: number;
};

const ThoughtBox = ({ children, backgroundColor, height }: ThoughtBoxProps) => {
  return (
    <MyBox
      sx={{
        width: "200px",
        height: height,
        backgroundColor: backgroundColor,
        borderRadius: 2,
      }}
    >
      {children}
    </MyBox>
  );
};

export default ThoughtBox;
