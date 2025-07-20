// components/ui/MyBox.tsx
import { Box, BoxProps } from "@mui/material";

const ThoughtBox = (props: BoxProps) => {
  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "#f0f0f0",
        borderRadius: 2,
        ...props.sx, // allow override
      }}
      {...props}
    />
  );
};

export default ThoughtBox;
