import { useState, useContext, useRef } from "react";
import DataContext from "../context/DataContext";

const Search = () => {
  const { setHikes, initialHikes } = useContext(DataContext);
  const [search, setSearch] = useState('');
  const searchEl = useRef(null);

  const handleSearch = () => {
    const searchTerm = searchEl.current.value.toLowerCase();
    if (searchTerm !== search) {
      setSearch(searchTerm);
      const filtered = initialHikes.filter(hike => hike.title.toLowerCase().includes(searchTerm) || hike.location.toLowerCase().includes(searchTerm) || hike.notes.toLowerCase().includes(searchTerm));
      console.log(filtered);
      setHikes(filtered);
    }

  };

  return (
    <div className="search">
      <input type="text" value={search} placeholder="Search for a specific hike"
        id="search" name="search" className="search__input"
        onChange={handleSearch} ref={searchEl} autoComplete="off" />
      <button className="search__btn" onClick={handleSearch}>Search</button>
    </div>
  );
};
export default Search;