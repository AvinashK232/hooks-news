import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputSearchRef = useRef();
  // const handleChange = event => {
  //   setQuery(event.target.value);
  // }
  const handleSearch = event => {
    event.preventDefault();
    fetch();
  }


  const fetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      setResults(response.data.hits);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleClear = () => {
    setQuery("");
    inputSearchRef.current.focus();
  }


  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-100 shadow-lg rounded">
      <img src={logo} className="float-right h-12 bg-black text-black" alt="logo" ></img>
      <h1 className="text-4xl text-grey-900 font-thin">News Feed</h1>
      <form className="mb-2"
        onSubmit={handleSearch}
      >
        <input className="border p-1 rounded" type="text" name="query" onChange={(event) => setQuery(event.target.value)} value={query} ref={inputSearchRef} />
        <input type="submit" value="Search" className="bg-orange-600 rounded m-1 p-1" />
        <input type="button" name="resetBtn" value="Clear" onClick={handleClear} className="bg-teal-600 text-white rounded p-1" />
      </form>
      {loading ? (<img src={logo} className="mx-auto p-4 m-2 App-logo" alt="logo" ></img>) :
        (<ul className="leading-normal">
          {results.map(result => (
            <li key={result.objectID} className="text-indigo-500 hover:text-indigo-900">
              <a href={result.url}>{result.title}</a>
            </li>
          ))}
        </ul>)
      }

      {error && <span className="text-red-900">{error.message}</span>}
    </div>
  );
}

export default App;
