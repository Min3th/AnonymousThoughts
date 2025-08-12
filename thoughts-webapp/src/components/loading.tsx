"use client";

import React from "react";
import { CircularProgress, Box, Backdrop } from "@mui/material";

type LoadingProps = {
  open: boolean; // Whether to show the loader
};

const Loading: React.FC<LoadingProps> = ({ open }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // darkened background
      }}
      open={open}
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress color="inherit" />
      </Box>
    </Backdrop>
  );
};

export default Loading;
