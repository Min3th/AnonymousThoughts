"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo, useState } from "react";
import ResponsiveAppBar from "../components/navbar";
import { SnackbarProvider } from "./utils/snackbar";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: { main: "#1976d2" },
                background: { default: "#f5f5f5" },
              }
            : {
                primary: { main: "#90caf9" },
                background: { default: "#121212" },
              }),
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <ResponsiveAppBar toggleTheme={toggleTheme} mode={mode} />
        <main style={{ flex: 1 }}>{children}</main>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
