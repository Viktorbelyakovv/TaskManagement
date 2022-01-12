import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "../Navigation";
import Container from "../Container";
import MainPage from "../../pages/MainPage";
import CompletedTasksPage from "../../pages/CompletedTasksPage";
import SettingsPage from "../../pages/SettingsPage";
import NotFound from "../../pages/NotFound";
import "./App.css";

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Container />}>
          <Route path="/" element={<MainPage />} />
          <Route path="CompletedTasksPage" element={<CompletedTasksPage />} />
          <Route path="SettingsPage" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
