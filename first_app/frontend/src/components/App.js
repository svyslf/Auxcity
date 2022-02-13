
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
function App() {
  
    ReactDOM.render(
        <div className="coolthings">
          {<HomePage/>}
        </div>,
      document.getElementById("app")
    );
  };
export default App();

