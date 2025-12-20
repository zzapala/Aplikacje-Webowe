export interface Article {
    id: number;
    title: string;
    content: string;
  }
  
  export const getArticles = (): Article[] =>
    JSON.parse(localStorage.getItem("articles") || "[]");
  
  export const saveArticles = (articles: Article[]) =>
    localStorage.setItem("articles", JSON.stringify(articles));
  