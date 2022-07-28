import { useState, useContext, useRef } from "react";
import { FaSearch, faSearch } from 'react-icons/fa';
import DataContext from "../context/DataContext";
import '../css/Search.css';

const Search = () => {
  const { setHikes, initialHikes } = useContext(DataContext);
  const [search, setSearch] = useState('');
  const searchEl = useRef(null);

  const handleSearch = () => {
    const searchTerm = searchEl.current.value.toLowerCase();
    if (searchTerm !== search) {
      setSearch(searchTerm);
      const filtered = initialHikes.filter(hike => hike.title.toLowerCase().includes(searchTerm) || hike.location.toLowerCase().includes(searchTerm) || hike.notes.toLowerCase().includes(searchTerm));
      setHikes(filtered);
    }

  };

  return (
    <div className="search">
      <input type="text" value={search} placeholder="Search for a specific hike"
        id="search" name="search" className="search__input"
        onChange={handleSearch} ref={searchEl} autoComplete="off" />
      <button className="search__btn" onClick={handleSearch}><span className="sr-only">Search</span> <FaSearch /></button>
    </div>
  );
};
export default Search;