import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Koszyk from "./pages/Koszyk"
import Login from "./pages/Login"
import Header from "./pages/Header"
import Produkty from "./pages/Produkty"

import './App.css'

function App() {
  return (
    <BrowserRouter>
     
      <Header /> 
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Produkty />} />
          <Route path="/cart" element={<Koszyk />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
