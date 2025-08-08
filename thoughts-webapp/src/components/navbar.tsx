"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import MyBox from "./box";
import Link from "next/link";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ClickAwayListener, Grow, MenuList, Paper, Popper } from "@mui/material";

const Categories = ["Love", "Sad", "Happy", "Bliss"];

type ResponsiveAppBarProps = {
  toggleTheme: () => void;
  mode: "light" | "dark";
};

function ResponsiveAppBar({ toggleTheme, mode }: ResponsiveAppBarProps) {
  const [anchorElCategories, setAnchorElCategories] = React.useState<null | HTMLElement>(null);

  const handleOpenCategoriesMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCategories(event.currentTarget);
  };

  const handleCloseCategoriesMenu = () => {
    setAnchorElCategories(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1a1a2e",
        color: "#ffffff",
        width: "100%", // prevents horizontal shift
        boxSizing: "border-box",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" passHref style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Anonymous Thoughts
            </Typography>
          </Link>
          <MyBox sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Link href="/publish" passHref style={{ textDecoration: "none" }}>
              <Button sx={{ my: 2, color: "white", display: "block" }}>PUBLISH</Button>
            </Link>
            <Link href="/about" passHref style={{ textDecoration: "none" }}>
              <Button sx={{ my: 2, color: "white", display: "block" }}>ABOUT</Button>
            </Link>
            <Button sx={{ my: 2, color: "white", display: "block" }} onClick={handleOpenCategoriesMenu}>
              Categories
            </Button>
            <Popper
              open={Boolean(anchorElCategories)}
              anchorEl={anchorElCategories}
              placement="bottom-end"
              transition
              disablePortal
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps} style={{ transformOrigin: "right top" }}>
                  <Paper sx={{ mt: 1, backgroundColor: "#1a1a2e", color: "#fff", minWidth: 160 }}>
                    <ClickAwayListener onClickAway={handleCloseCategoriesMenu}>
                      <MenuList autoFocusItem={Boolean(anchorElCategories)}>
                        {Categories.map((category) => (
                          <MenuItem key={category} onClick={handleCloseCategoriesMenu}>
                            <Link
                              href={`/${category.toLowerCase()}`}
                              passHref
                              style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                            >
                              <Typography sx={{ textAlign: "center" }}>{category}</Typography>
                            </Link>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </MyBox>
          <MyBox>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </MyBox>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
