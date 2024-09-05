import "./App.css";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      {/* all the other elements */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
