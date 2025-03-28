import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Settings from "./pages/Settings";
import Timestamps from "./pages/Timestamps";
import Davinci from "./pages/Davinci";
import { ROUTES } from "./utils/configs";

function App() {
  return (
    <Router basename="/">
      <Header />
      <Routes>
        <Route
          path={ROUTES.timestamps}
          exact
          Component={Timestamps}
        />
        <Route
          path={ROUTES.timestamps}
          exact
          Component={Timestamps}
        />
        <Route
          path={ROUTES.davinci}
          exact
          Component={Davinci}
        />
        <Route
          path={ROUTES.settings}
          exact
          Component={Settings}
        />
      </Routes>
    </Router>
  );
}

export default App;
