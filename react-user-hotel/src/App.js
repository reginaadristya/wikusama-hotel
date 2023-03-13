import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Main from "./Main";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='*' element={<Main />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
