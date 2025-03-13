import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/sidebaradmin";

const App = () => {
  return (
    <Router>
      <Sidebar />
    </Router>
  );
};

export default App;
