// components/ui/MyBox.tsx
import { Box, BoxProps } from "@mui/material";

const MyBox = (props: BoxProps) => {
  return (
    <Box
      sx={{
        ...props.sx, // allow override
      }}
      {...props}
    />
  );
};

export default MyBox;
