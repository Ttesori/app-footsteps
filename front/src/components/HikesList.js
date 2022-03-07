import { useEffect, useContext } from "react";
import DataContext from "../context/DataContext";
import FilterTime from "./FilterTime";
import FilterSort from "./FilterSort";
import HikeItem from "./HikeItem";
import Search from "./Search";

const HikesList = () => {
  const { hikes, setCreateIsOpen } = useContext(DataContext);

  useEffect(() => {
    console.log(hikes);
  }, [hikes]);


  return hikes && (
    <section>
      <h2>My Hikes</h2>
      <Search />
      <FilterTime />
      <FilterSort />
      <button onClick={() => setCreateIsOpen(true)}>Add New Hike</button>
      {hikes.map(hike => <HikeItem hike={hike} key={hike._id} />)}
    </section>
  );
};
export default HikesList;