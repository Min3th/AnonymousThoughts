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
        backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: 2,
        p: 2,
        boxShadow: 2,
        width: "100%",
      }}
    >
      {children}
    </MyBox>
  );
};

export default ThoughtBox;
