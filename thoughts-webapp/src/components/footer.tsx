"use client";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Link } from "@mui/material";

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentMode = theme.palette.mode;

  return (
    <Box
      component="footer"
      sx={{
        padding: 2,
        backgroundColor: currentMode === "light" ? "#f1f1f1" : theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: "auto",
      }}
    >
      <Box textAlign="center">
        <Typography variant="body2" color="textSecondary" gutterBottom>
          &copy; {new Date().getFullYear()} MyApp. All rights reserved.
        </Typography>

        <Typography variant="body2" color="textSecondary">
          <Link href="/about" underline="hover" sx={{ mx: 1, cursor: "pointer" }}>
            About
          </Link>
          |
          <Link href="/contact" underline="hover" sx={{ mx: 1, cursor: "pointer" }}>
            Contact
          </Link>
          |
          <Link
            href="https://github.com/myapp"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ mx: 1, cursor: "pointer" }}
          >
            GitHub
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
