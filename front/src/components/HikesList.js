import { useContext } from "react";
import DataContext from "../context/DataContext";
import FilterTime from "./FilterTime";
import FilterSort from "./FilterSort";
import HikeItem from "./HikeItem";
import Search from "./Search";

const HikesList = () => {
  const { hikes, setCreateIsOpen } = useContext(DataContext);

  return hikes && (
    <section>
      <h2>My Hikes</h2>
      <Search />
      <FilterTime />
      <FilterSort />
      <button onClick={() => setCreateIsOpen(true)}>Add New Hike</button>
      {hikes?.length > 0 ? hikes.map(hike => <HikeItem hike={hike} key={hike._id} />) : <p>No hikes found.</p>}
    </section>
  );
};
export default HikesList;