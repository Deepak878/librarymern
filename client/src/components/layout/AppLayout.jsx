import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import BooksList from "../booklist/BooksList";
import { LoginDialog } from "../logindialog/LoginDialog";
import { Route, Routes, Navigate, Link } from "react-router-dom";


const Applayout = () => {
  const [openLoginDialog,setOpenLoginDialog] = useState(false)

  const handleLoginSubmit = (username,password)=>{
    console.log(username,password)
  }
  const handleLoginClose = ()=>{
    setOpenLoginDialog(false)
  }
  return (
    <>
      <AppBar position="static">
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: "flex", mr: 1 }} />
              <Link to="/" style={{ textDecoration: "none", flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    display: "flex",
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "white",
                  }}
                >
                  Library Management System
                </Typography>
              </Link>
              <Box
                sx={{
                  flexGrow: 0,
                }}
              >
             
                <Button
                  onClick={() => {
                     setOpenLoginDialog(true)
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
                {/* )} */}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Routes>
          <Route path="/books" exact element={<BooksList />} />
        </Routes>
        <LoginDialog
          open={openLoginDialog}
          handleSubmit={handleLoginSubmit}
          handleClose={handleLoginClose}
        />
      </AppBar>
    </>
  );
};

export default Applayout;
