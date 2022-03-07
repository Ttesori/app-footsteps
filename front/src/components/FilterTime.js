const FilterTime = () => {
  return (
    <section class="filter-time">
      <label htmlFor="time">Show Latest</label>
      <select id="time" name="time">
        <option value="30">30 days</option>
        <option value="60">60 days</option>
        <option value="60">90 days</option>
        <option value="-1">All Time</option>
      </select>
    </section>
  );
};
export default FilterTime;