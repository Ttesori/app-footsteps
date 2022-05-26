import { useContext } from "react";
import { FaClock } from 'react-icons/fa';
import DataContext from "../context/DataContext";
import '../css/FilterTime.css';
import dayjs from "dayjs";

const FilterTime = () => {
  const { setHikes, initialHikes } = useContext(DataContext);
  const handleFilterTimeChange = (e) => {
    const filter = e.target.value;
    if (filter === "all") return setHikes(initialHikes);
    const dates = {
      "30": dayjs().subtract(30, 'd'),
      "60": dayjs().subtract(60, 'd'),
      "90": dayjs().subtract(90, 'd'),
      "year": dayjs(`${dayjs().format('YYYY')}-01-01`),
    };
    setHikes(initialHikes.filter(hike => dayjs(hike.date).isAfter(dates[filter])));
  };

  return (
    <section className="filter-time">
      <FaClock />
      <label htmlFor="time" className="sr-only">Show Latest</label>
      <div className="filter-time__selectFaux">
        <select id="time" name="time" onChange={handleFilterTimeChange} className="filter-time__select select-reset">
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