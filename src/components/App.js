import React from "react";
import NavigationBar from "./NavigationBar";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import AnalysisPage from "./AnalysisPage";

function App() {
  return (
      <BrowserRouter>
          <div id="container">
              <NavigationBar/>
              <Routes>
                  <Route path="/" element={<HomePage/>} />
                  <Route path="/about" element={<AboutPage/>} />
                  <Route path="/analysis" element={<AnalysisPage/>} />
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
