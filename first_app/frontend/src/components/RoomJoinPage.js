import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import theme from "./theme";

export default function RoomJoinPage() {

  const initialState = {
    roomCode: '',
    error: false,
    errormsg: "",
  };

  const [roomData, setRoomData] = useState(initialState);

  const navigate = useNavigate()

  function handleTextFieldChange(e) {
    setRoomData({
      ...roomData,
      roomCode: e.target.value,
    });
  }

  function roomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
      code: roomData.roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
    .then((response) => {
      if (response.ok) {
        navigate("/room/" + roomData.roomCode);
      } else {
        setRoomData({
          ...roomData,
          errormsg : "Room not found", 
        });
      }
    })
    .catch((errormsg) => {
      console.log(errormsg);
    });
  
  }  
      return (
        <ThemeProvider theme={theme}>
          <Grid container spacing={1}>
            <Grid item xs={12} align="center">
              <Typography variant="h4" component="h4">
                Join a Room
              </Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <TextField
                error={roomData.error} 
                label="Code"
                placeholder="Enter a Room Code"
                value={roomData.roomCode}
                helperText={roomData.error}
                variant="outlined"
                onChange={handleTextFieldChange}
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                variant="contained"
                color= "primary"
                onClick={roomButtonPressed}>
                Enter Room
              </Button>
            </Grid>
            <Grid item xs={12} align="center">
              <Button variant="contained" color="secondary" to="/" component={Link}>
                Back
              </Button>
            </Grid>
          </Grid>
        </ThemeProvider>
      );
    }
  