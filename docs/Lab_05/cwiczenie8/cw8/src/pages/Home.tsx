import { Link, useNavigate } from "react-router-dom";
import { getArticles } from "../utils/storage";
import type { Article } from "../utils/storage";
import "./Home.css";

function Blog() {
  const articles: Article[] = getArticles();
  const navigate = useNavigate(); 


  const handleClick = () => {
    navigate("/dodaj"); 
  };

  return (
    <>
      <h1>Lorem Ipsum</h1>

      <button onClick={handleClick}>
        Dodaj artykuł
      </button>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <Link to={`/article/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Blog;
