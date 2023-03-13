import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Main from "./Main";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='*' element={<Main />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
