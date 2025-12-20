import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import AddArticle from "./pages/AddArticle";
import "./App.css";

function App() {
  return (
    <div className="app-container">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dodaj" element={<AddArticle />} />
      <Route path="/article/:id" element={<Article />} />
    </Routes>
    </div>
  );
}

export default App;
