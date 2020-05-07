import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SchoolMealsPage from "./pages/SchoolMealsPage";
import SchoolSearchPage from "./pages/SchoolSearchPage";
import "./App.scss";

function App() {
  return (
    <Router>
      <Route path="/search" exact={true} component={SchoolMealsPage}></Route>
      <Route path="/" component={SchoolSearchPage}></Route>
    </Router>
  );
}

export default App;
