import { useState } from 'react';

const SearchBar = ({ setQuery }) => {
  const [input, setInput] = useState('');
  const handleChange = e => setInput(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    if (!input) return alert('No empty queries, pls');
    setQuery(input);
    setInput('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={input} onChange={handleChange} />
      <input type='submit' />
    </form>
  );
};

export default SearchBar;
