import React, { Component } from "react";
import { useState, useEffect } from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinpage";
import Room from "./Room";
import theme from "./theme";
import { TextField, Button, Grid, Typography, ThemeProvider } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRoutes,
  Navigate,
} from "react-router-dom";

function HomePage(){
  const [roomCode, setroomCode] = useState(null);
  
  const fetchdata = async () =>  {
    fetch("/api/user-in-room")
    .then((response) => response.json())
    .then((data) => {
    setroomCode({
        roomCode: data.code,
      });
    });
  }; 
  useEffect(() => {
  fetchdata();
  }, []);
 
  function landingpage() {
    const CLIENT_ID = "263f06cf8fe342c596d25b13097b09c5"
    const REDIRECT_URI = "http://localhost:8000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const [token, setToken] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }
    return(
    <ThemeProvider theme={theme}>
        <b>Auxcity</b>
        <Grid item xs={12} align="center">
          {!token ? null : <Button variant="contained" color="secondary" to="/join" component={Link}> 
          Join a room 
          </Button>}
        </Grid>
        <Grid item xs={12} align="center">
          {!token ? null : <Button variant="contained" color="primary" to="/create" component={Link}>
          Create a room </Button> }
        </Grid>
        <Grid item xs={12} align="center" color = "secondary">
          {!token ?
          <Button> <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
              with Spotify</a> </Button>
          : <Button onClick={logout}>Logout</Button>}
        </Grid>
    </ThemeProvider>
    );
  } 
    return (
      <Router>
        <Routes>
            <Route path="/" element = {landingpage()}/>
            <Route path="/join" element={<RoomJoinPage />} />
            <Route path="/Create" element={<CreateRoomPage />} /> 
            <Route path = "/room/:roomCode" element ={<Room />}/>
        </Routes>
      </Router> 
    );
  };
  export default HomePage;


