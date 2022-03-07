const FilterSort = () => {
  return (
    <section class="filter-time">
      <label htmlFor="time">Sort By</label>
      <select id="time" name="time">
        <option value="0">Newest</option>
        <option value="1">Oldest</option>
        <option value="2">Distance</option>
      </select>
    </section>
  );
};
export default FilterSort;