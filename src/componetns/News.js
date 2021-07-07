const News = ({ news, loading }) => {
  if (loading) return 'Loading...';
  return (
    <div>
      <ul>
        {news.length > 0
          ? news.map(article => <li key={article.objectID}>{article.title}</li>)
          : 'No articles were found'}
      </ul>
    </div>
  );
};

export default News;
