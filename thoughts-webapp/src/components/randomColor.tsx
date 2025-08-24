// Function to generate a random light color based on the current mode (light or dark)
import { PaletteMode } from "@mui/material";

export const getRandomLightColor = (currentMode: PaletteMode) => {
  const hue = Math.floor(Math.random() * 360);
  const lightness = currentMode === "dark" ? 30 : 85;
  return `hsl(${hue}, 100%, ${lightness}%)`;
};
