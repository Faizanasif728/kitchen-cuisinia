import React from "react";
import Navbar from "./components/Navbar";
import SideBar from "./components/sideBar";
import { Route, Routes } from "react-router-dom";
import AddItems from "./pages/AddItems";
import ListItems from "./pages/ListItems";
import Orders from "./pages/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  // Prefer production URL if available, otherwise fallback to local
  const url =
    import.meta.env.VITE_API_URL_PRODUCTION &&
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL_PRODUCTION
      : import.meta.env.VITE_API_URL || "http://localhost:3000";

  return (
    <>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <SideBar />

        <Routes>
          <Route path="/add-item" element={<AddItems url={url} />} />
          <Route path="/items-list" element={<ListItems url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
