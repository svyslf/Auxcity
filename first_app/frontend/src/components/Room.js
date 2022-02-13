import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import theme from "./theme";
import { TextField, Button, Grid, Typography, ThemeProvider } from "@material-ui/core";

export default function Room() {
  const {roomCode}= useParams();
  const initialState = {  
    votesToSKip: 2,
    guestCanPause: false,
    isHost: false,
  };
  const [roomData, setRoomData] = useState(initialState);
 
  const getroomdetails = () => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((res) => {
       /* navigate('/')*/
        return res.json();
      })
      .then((data) => {
        setRoomData({
          ...roomData,
          votesToSKip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
    };
  
  useEffect(() => {
    getroomdetails();
    }, []);
  const navigate = useNavigate();

  function leavebuttonpressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      navigate('/')
     });
  }

  return (
    <ThemeProvider theme={theme}>
      <h3>{roomCode}</h3>
      <p>Votes: {roomData.votesToSKip}</p>
      <p>Guest: {roomData.guestCanPause.toString()}</p>
      <p>Host: {roomData.isHost.toString()}</p>
      <Grid item xs={12} align="center" color = "secondary">
        <Button onClick={leavebuttonpressed}>
          <span>Leave room</span>
        </Button>
      </Grid>
    </ThemeProvider>
  );
};
