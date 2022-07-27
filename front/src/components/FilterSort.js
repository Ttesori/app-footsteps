import '../css/FilterSort.css';
import { useContext, useState } from 'react';
import { FaSortAmountDownAlt } from 'react-icons/fa';
import DataContext from "../context/DataContext";

const FilterSort = () => {
  const { sortBy, setSortBy } = useContext(DataContext);
  const [localSort, setLocalSort] = useState(sortBy);
  const updateSort = (e) => {
    setLocalSort(e.target.value);
    setSortBy(Number(e.target.value));
  };
  return (
    <section className="filter-sort">
      <label htmlFor="sort" className="sr-only">Sort By</label>
      <FaSortAmountDownAlt />
      <div className="filter-sort__selectFaux">
        <select id="sort" name="sort" className="filter-sort__select select-reset" value={localSort} onChange={updateSort}>
          <option value="0">Newest First</option>
          <option value="1">Oldest First</option>
          <option value="2">Longest First</option>
          <option value="3">Shortest First</option>
        </select>
      </div>

    </section>
  );
};
export default FilterSort;