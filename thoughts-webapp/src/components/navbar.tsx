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
import {
  ClickAwayListener,
  Dialog,
  DialogContent,
  Grow,
  InputAdornment,
  MenuList,
  Paper,
  Popper,
  TextField,
  useTheme,
} from "@mui/material";
import ThoughtsIcon from "../../public/images/annonymous-thoughts.png";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import useThoughts from "../app/requests/api";
import ThoughtBox from "./thoughtbox";
import { getRandomLightColor } from "./randomColor";

const Categories = ["Love", "Sad", "Happy", "Bliss"];

type ResponsiveAppBarProps = {
  toggleTheme: () => void;
  mode: "light" | "dark";
};

function ResponsiveAppBar({ toggleTheme, mode }: ResponsiveAppBarProps) {
  const theme = useTheme();
  const currentMode = theme.palette.mode;
  const [anchorElCategories, setAnchorElCategories] = React.useState<null | HTMLElement>(null);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [openThought, setOpenThought] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [thought, setThought] = useState<any | null>();
  const { fetchThoughtById } = useThoughts();

  const handleOpenCategoriesMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCategories(event.currentTarget);
  };

  const handleCloseCategoriesMenu = () => {
    setAnchorElCategories(null);
  };

  const handleOpenSearch = () => {
    setOpenSearch(true);
  };
  const handleOpenThought = () => {
    setOpenThought(true);
  };

  const handleCloseSearch = () => {
    setOpenSearch(false);
  };
  const handleCloseThought = () => {
    setOpenThought(false);
  };

  const handleSearch = async () => {
    console.log("Searching for:", searchQuery);
    if (searchQuery.trim() === "") {
      setThought([]);
      return;
    }

    try {
      const res = await fetchThoughtById(searchQuery.trim());
      if (res) {
        setThought(res); // wrap in array for easy mapping
        setOpenSearch(false);
        setOpenThought(true);
      } else {
        setThought(null);
      }
    } catch (err) {
      console.error("Error searching thoughts:", err);
    }
  };

  return (
    <>
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
            <Link href="/" passHref style={{ textDecoration: "none", color: "white" }}>
              {/* <Image src={ThoughtsIcon} alt="Thoughts icon" height={50} /> */}
              Anonymous Thoughts
            </Link>
            <MyBox sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
              <Link href="/" passHref style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    transition: "transform 0.1s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.2)",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  HOME
                </Button>
              </Link>
              <Link href="/publish" passHref style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    transition: "transform 0.1s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.2)",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  PUBLISH
                </Button>
              </Link>
              <Link href="/about" passHref style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    transition: "transform 0.1s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.2)",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  ABOUT
                </Button>
              </Link>
              <Button
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  transition: "transform 0.1s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "transparent",
                  },
                }}
                onClick={handleOpenCategoriesMenu}
              >
                Categories
              </Button>
              <Button
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  transition: "transform 0.1s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "transparent",
                  },
                }}
                onClick={handleOpenSearch}
              >
                <SearchIcon />
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
      {/* Search Dialog */}
      <Dialog
        open={openSearch}
        onClose={handleCloseSearch}
        fullWidth
        maxWidth="sm"
        slotProps={{
          backdrop: {
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.8)", // darker than default
            },
          },
        }}
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            placeholder="Search..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Button onClick={handleSearch}>
                      <SearchIcon />
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={openThought}
        onClose={handleCloseThought}
        fullWidth
        maxWidth="sm"
        slotProps={{
          backdrop: {
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.9)", // darker than default
            },
          },
        }}
        sx={{ backgroundColor: "transparent", padding: 0 }}
      >
        <DialogContent sx={{ backgroundColor: "transparent", padding: 0 }}>
          {thought ? (
            <ThoughtBox backgroundColor={getRandomLightColor(currentMode)}>
              <div>
                <strong>{thought.topic}</strong>
                <p>{thought.content}</p>
              </div>
            </ThoughtBox>
          ) : (
            searchQuery && <p>No results found</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
export default ResponsiveAppBar;
