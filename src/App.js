import { useState, useEffect, useCallback } from 'react';
import SearchBar from './componetns/SearchBar';
import News from './componetns/News';

const App = () => {
  /* 
   - Fetch data from API
   -- call it inside useEffect
   -- dependant on query -> state
  */
  const [query, setQuery] = useState('react');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);
  const [infoFromQuery, setInfoFromQuery] = useState({});

  const getNews = useCallback(() => {
    setLoading(true);
    fetch(`https://hn.algolia.com/api/v1/search?query=${query}&tags=story`)
      .then(res => res.json())
      .then(({ hits, ...rest }) => {
        setNews(hits);
        setInfoFromQuery(rest);
        setLoading(false);
      })
      .catch(err => {
        setError(new Error('API is down, try again later'));
        setLoading(false);
      });
  }, [query]);

  useEffect(() => {
    getNews();
    const interval = setInterval(() => getNews(), 300000);
    return () => clearInterval(interval);
  }, [getNews]);
  if (error) return <div>{error.message}</div>;
  return (
    <div className='container'>
      <h1>Hackernews 📰</h1>
      <SearchBar setQuery={setQuery} />
      <News loading={loading} news={news} />
    </div>
  );
};

export default App;
