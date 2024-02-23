import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LaunchList from './components/LaunchList';
import './App.css';

function App() {
  const pageSize = 10;
  const [allLaunches, setAllLaunches] = useState([]);
  const [launches, setLaunches] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchAllLaunches = async () => {
      try {
        const response = await axios.get(
          'https://api.spacexdata.com/v4/launches'
        );
        setAllLaunches(response.data);
        setLaunches(response.data.slice(0, pageSize));
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAllLaunches();
  }, []);

  const fetchMoreLaunches = () => {
    if (loading) return;

    setLoading(true);
    const nextPage = launches.length / pageSize;
    const nextSetOfLaunches = allLaunches.slice(
      nextPage * pageSize,
      (nextPage + 1) * pageSize
    );

    setLaunches((prev) => [...prev, ...nextSetOfLaunches]);
    setHasMore((nextPage + 1) * pageSize < allLaunches.length);
    setLoading(false);
  };

  const handleSearch = (event) => {
    const keyword = event.target.value;
    setSearch(keyword);
    if (keyword.trim() === '') {
      setLaunches(allLaunches.slice(0, pageSize));
      setHasMore(allLaunches.length > pageSize);
    } else {
      const filtered = allLaunches.filter(
        (launch) =>
          launch.name.toLowerCase().includes(keyword.toLowerCase()) ||
          (launch.details &&
            launch.details.toLowerCase().includes(keyword.toLowerCase()))
      );
      setLaunches(filtered);
      setHasMore(false);
    }
  };

  return (
    <div className='App'>
      <div className='search-bar'>
        <input
          type='text'
          className='search-input'
          placeholder='Enter keywords'
          value={search}
          onChange={handleSearch}
        />
      </div>
      <LaunchList
        launches={launches}
        loading={loading}
        fetchMoreLaunches={fetchMoreLaunches}
        hasMore={hasMore}
      />
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
