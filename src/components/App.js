import React from "react";
import NavigationBar from "./NavigationBar";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import AnalysisPage from "./AnalysisPage";
import ResultsPage from "./ResultsPage";

function App() {
  return (
      <BrowserRouter>
          <div id="container">
              <NavigationBar/>
              <Routes>
                  <Route path="/" element={<HomePage/>} />
                  <Route path="/about" element={<AboutPage/>} />
                  <Route path="/analysis" element={<AnalysisPage/>} />
                  <Route path="/results" element={<ResultsPage/>} />
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
