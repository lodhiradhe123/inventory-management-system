import React from "react";
import QRGeneratorForm from "./components/QRGeneratorForm";
import QRScannerForm from "./components/QRScannerForm";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import UpdateComponent from "./components/UpdateComponent";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Footer from "./components/Footer";

function App() {
  const auth = localStorage.getItem("token");
  return (
    <div>
      <Navbar />

      <Routes>
        {auth ? (
          <>
            <Route path="/QR-generator" element={<QRGeneratorForm />} />
            <Route path="/scanner" element={<QRScannerForm />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/update/:id" element={<UpdateComponent />} />
          </>
        ) : (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
