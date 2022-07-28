import { useContext } from "react";
import { FaClock } from 'react-icons/fa';
import DataContext from "../context/DataContext";
import '../css/FilterTime.css';

const FilterTime = () => {
  const { filterTime, setFilterTime } = useContext(DataContext);

  const handleFilterTimeChange = (e) => {
    setFilterTime(e.target.value);
  };

  return (
    <section className="filter-time">
      <FaClock />
      <label htmlFor="time" className="sr-only">Show Latest</label>
      <div className="filter-time__selectFaux">
        <select id="time" name="time" value={filterTime} onChange={handleFilterTimeChange} className="filter-time__select select-reset">
          <option value="30">Last 30 days</option>
          <option value="60">Last 60 days</option>
          <option value="60">Last 90 days</option>
          <option value="year">This Year</option>
          <option value="all">All Time</option>
        </select>
      </div>

    </section>
  );
};
export default FilterTime;