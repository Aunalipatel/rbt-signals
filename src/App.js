import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeScreen from "./HomeScreen.js";
import Books from "./Books.js";

function App() {
  return (
    <Router>
      <main className="py-3">
        <div>
          <Routes>
            <Route exact path="/books" element={<Books />} />
            <Route exact path="/" element={<HomeScreen />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
