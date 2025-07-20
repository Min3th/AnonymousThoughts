import { ReactNode } from "react";
import MyBox from "./box";

type ThoughtBoxProps = {
  children: ReactNode;
  backgroundColor?: string;
};

const ThoughtBox = ({ children, backgroundColor }: ThoughtBoxProps) => {
  return (
    <MyBox
      sx={{
        width: "200px",
        height: "100px",
        backgroundColor: backgroundColor,
        borderRadius: 2,
      }}
    >
      {children}
    </MyBox>
  );
};

export default ThoughtBox;
