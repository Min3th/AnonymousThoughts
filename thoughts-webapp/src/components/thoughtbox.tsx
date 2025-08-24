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
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      {children}
    </MyBox>
  );
};

export default ThoughtBox;
