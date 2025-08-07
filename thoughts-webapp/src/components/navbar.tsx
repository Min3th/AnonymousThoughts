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

const Categories = ["Love", "Sad", "Happiness", "Bliss"];

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
    <AppBar position="static" sx={{ backgroundColor: "#1a1a2e", color: "#ffffff" }}>
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
                display: { xs: "none", md: "flex" },
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

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <MyBox sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></MyBox>
          <MyBox sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link href="/publish" passHref style={{ textDecoration: "none" }}>
              <Button sx={{ my: 2, color: "white", display: "block" }}>PUBLISH</Button>
            </Link>
            <Link href="/about" passHref style={{ textDecoration: "none" }}>
              <Button sx={{ my: 2, color: "white", display: "block" }}>ABOUT</Button>
            </Link>
            <Button sx={{ my: 2, color: "white", display: "block" }} onClick={handleOpenCategoriesMenu}>
              Categories
            </Button>
            <Menu
              sx={{ mt: "45px" }}
              id="categories"
              anchorEl={anchorElCategories}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElCategories)}
              onClose={handleCloseCategoriesMenu}
            >
              {Categories.map((category) => (
                <MenuItem key={category} onClick={handleCloseCategoriesMenu}>
                  <Typography sx={{ textAlign: "center" }}>{category}</Typography>
                </MenuItem>
              ))}
            </Menu>
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
