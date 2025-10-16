import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import HolcimPage from "./HolcimPage";

const AppRouter = () => (
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/holcim" element={<HolcimPage />} />
        </Routes>
    </Router>
);

export default AppRouter;
