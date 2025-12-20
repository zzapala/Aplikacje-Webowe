import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArticles, saveArticles } from "../utils/storage";
import type { Article } from "../utils/storage";


function AddArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const articles: Article[] = getArticles();

    const newArticle: Article = {
      id: Date.now(),
      title,
      content,
    };

    articles.push(newArticle);
    saveArticles(articles);

    navigate("/home");
  };

  return (
    <>
      <h1>Dodaj artykuł</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Tytuł"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Treść"
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <button type="submit">DODAJ</button>
      </form>
    </>
  );
}

export default AddArticle;
