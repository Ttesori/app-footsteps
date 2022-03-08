import { useContext } from "react";
import DataContext from "../context/DataContext";
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
      <label htmlFor="time">Show Latest</label>
      <select id="time" name="time" onChange={handleFilterTimeChange}>
        <option value="30">30 days</option>
        <option value="60">60 days</option>
        <option value="60">90 days</option>
        <option value="year">This Year</option>
        <option value="all">All Time</option>
      </select>
    </section>
  );
};
export default FilterTime;