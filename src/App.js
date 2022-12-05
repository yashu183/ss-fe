import "./App.css";
import React, { Fragment } from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Team from "./components/Team";
import Projects from "./components/Projects";
import Tree from "./components/Tree";

function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <Navbar />
          <div id="container"></div>
          {/* <div id="project-container"></div> */}
          <Routes>
            <Route path="/" element={<Navigate to="/team" />} />
            <Route exact path="/team" element={<Team />} />
            <Route exact path="/projects" element={<Projects />} />
            <Route exact path="/tree" element={<Tree />} />
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
