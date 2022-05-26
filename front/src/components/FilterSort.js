import '../css/FilterSort.css';
import { FaSortAmountDownAlt } from 'react-icons/fa';

const FilterSort = () => {
  return (
    <section className="filter-sort">
      <label htmlFor="sort" className="sr-only">Sort By</label>
      <FaSortAmountDownAlt />
      <div className="filter-sort__selectFaux">
        <select id="sort" name="sort" className="filter-sort__select select-reset">
          <option value="0">Newest First</option>
          <option value="1">Oldest First</option>
          <option value="2">By Distance</option>
        </select>
      </div>

    </section>
  );
};
export default FilterSort;