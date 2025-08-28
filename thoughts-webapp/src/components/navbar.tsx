"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MyBox from "./box";
import Link from "next/link";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
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
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import useThoughts from "../app/requests/api";
import ThoughtBox from "./thoughtbox";
import { getRandomLightColor } from "./randomColor";
import { Padding } from "@mui/icons-material";
import Menu from "@mui/material/Menu";

const Categories = ["Love", "Sad", "Happy", "Bliss"];

type ResponsiveAppBarProps = {
  toggleTheme: () => void;
  mode: "light" | "dark";
};

function ResponsiveAppBar({ toggleTheme, mode }: ResponsiveAppBarProps) {
  const theme = useTheme();
  const currentMode = theme.palette.mode;
  const [anchorElCategories, setAnchorElCategories] = useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSearch, setOpenSearch] = useState(false);
  const [openThought, setOpenThought] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [thought, setThought] = useState<any | null>();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
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

  const handleCloseSearch = () => {
    setOpenSearch(false);
  };
  const handleCloseThought = () => {
    setOpenThought(false);
  };
  const handleCloseMobMenu = () => {
    setAnchorEl(null);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setThought([]);
      return;
    }

    try {
      const res = await fetchThoughtById(searchQuery.trim());
      if (res) {
        setThought(res);
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
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link href="/" passHref style={{ textDecoration: "none", color: "white", letterSpacing: 2 }}>
              {/* <Image src={ThoughtsIcon} alt="Thoughts icon" height={50} /> */}
              ANONYMOUS THOUGHTS
            </Link>
            <MyBox
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
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
              <Link href="/about" passHref style={{ textDecoration: "none", padding: 0, alignItems: "center" }}>
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
                  ABOUT US
                </Button>
              </Link>
              <Button
                sx={{
                  my: 2,
                  lineHeight: 0.5,
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
            <MyBox sx={{ marginLeft: "auto", display: { xs: "flex", md: "none" } }}>
              <IconButton color="inherit" onClick={handleClick}>
                <MenuIcon />
              </IconButton>
            </MyBox>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMobMenu}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >
              <MenuItem onClick={handleCloseMobMenu}>
                <Link href="/" passHref style={{ textDecoration: "none", padding: 0, alignItems: "center" }}>
                  Home
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseMobMenu}>
                {" "}
                <Link href="/publish" passHref style={{ textDecoration: "none", padding: 0, alignItems: "center" }}>
                  Publish
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseMobMenu}>
                {" "}
                <Link href="/about" passHref style={{ textDecoration: "none", padding: 0, alignItems: "center" }}>
                  About Us
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseMobMenu}>
                {" "}
                <Link href="/about" passHref style={{ textDecoration: "none", padding: 0, alignItems: "center" }}>
                  Categories
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseMobMenu}>
                {" "}
                <Link href="/about" passHref style={{ textDecoration: "none", padding: 0, alignItems: "center" }}>
                  Search
                </Link>
              </MenuItem>
            </Menu>
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
              backgroundColor: "rgba(0, 0, 0, 0.9)",
            },
          },
        }}
        sx={{ backgroundColor: "transparent", padding: 0 }}
      >
        <DialogContent sx={{ backgroundColor: "transparent", padding: 0 }}>
          {thought ? (
            <MyBox
              sx={{
                backgroundColor: getRandomLightColor(currentMode),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                borderRadius: 2,
                p: 2,
                boxShadow: 2,
                width: "100%",
              }}
            >
              <div>
                <strong>{thought.topic}</strong>
                <p>{thought.content}</p>
              </div>
            </MyBox>
          ) : (
            searchQuery && <p>No results found</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
export default ResponsiveAppBar;
