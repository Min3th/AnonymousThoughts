// components/ui/MyBox.tsx
import { Box, BoxProps } from "@mui/material";

const MyBox = (props: BoxProps) => {
  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 2,
        ...props.sx, // allow override
      }}
      {...props}
    />
  );
};

export default MyBox;
