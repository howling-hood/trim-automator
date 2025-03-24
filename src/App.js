import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Gather from "./pages/Gather";
import Reduce from "./pages/Reduce";
import Cutter from "./pages/Cutter";

function App() {
  return (
    <Router basename="/">
      <Header />
      <Routes>
        <Route
          path="/"
          exact
          Component={Gather}
        />
        <Route
          path="/reduce"
          exact
          Component={Reduce}
        />
        <Route
          path="/cutter"
          exact
          Component={Cutter}
        />
      </Routes>
    </Router>
  );
}

export default App;
