import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Navbar from "./components/Navbar";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen overflow-hidden bg-[#f8faf9]">
        <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex-1 overflow-hidden relative">
          <Routes>
            <Route path="/" element={<ProductsPage searchQuery={searchQuery} />} />
            <Route path="/products/:slug" element={<ProductDetailsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;