import { useParams, Link } from "react-router-dom";
import { getArticles } from "../utils/storage";
import type { Article as ArticleType} from "../utils/storage";
import "./ArticleStyle.css";
function Article() {
  const { id } = useParams<{ id: string }>(); // id jest stringiem z URL

  const articles: ArticleType[] = getArticles();
  const article = articles.find(a => a.id === Number(id));

  if (!article) return <p>Nie znaleziono artykułu</p>;

  return (
    <>
    <div className="article-page">
        <h1>{article.title}</h1>
        <p>{article.content}</p>
    </div>
      
      <Link to="/home">⬅ Powrót</Link>
    </>
  );
}

export default Article;
