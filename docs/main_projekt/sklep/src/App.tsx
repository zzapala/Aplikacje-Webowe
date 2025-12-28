import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Koszyk from "./pages/Koszyk"
import Login from "./pages/Login"
import Header from "./pages/Header"
import Produkty from "./pages/Produkty"
import BookDetailsPage from "./pages/PodstronaProduktu"
import Panel from "./pages/Panel"

import './App.css'
import Rejestracja from "./pages/Rejestracja"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Header /> 
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Produkty />} />
          <Route path="/products/:id" element={<BookDetailsPage />} />
          
          <Route path="/cart" element={<Koszyk />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Rejestracja />} />
          <Route path="/account" element={<Panel />} />
        </Routes>
      </main>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
