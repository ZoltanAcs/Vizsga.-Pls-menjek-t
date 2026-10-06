import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import All from "./pages/All";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<All />} />
        <Route path="/kosar" element={<Cart />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </StrictMode>,
);
