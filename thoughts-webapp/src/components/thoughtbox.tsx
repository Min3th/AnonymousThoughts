// components/ui/MyBox.tsx
import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";
import MyBox from "./box";

type ThoughtBoxProps = {
  children: ReactNode;
};

const ThoughtBox = ({ children }: ThoughtBoxProps) => {
  return (
    <MyBox
      sx={{
        width: "200px",
        height: "100px",
        padding: 2,
        backgroundColor: "#008000",
        borderRadius: 2,
      }}
    >
      {children}
    </MyBox>
  );
};

export default ThoughtBox;
