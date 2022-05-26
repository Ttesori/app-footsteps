import { useContext } from "react";
import DataContext from "../context/DataContext";
import FilterTime from "./FilterTime";
import FilterSort from "./FilterSort";
import HikeItem from "./HikeItem";
import Search from "./Search";
import { IoFootsteps, IoAddCircle } from "react-icons/io5";
import '../css/HikesList.css';

const HikesList = () => {
  const { hikes, setCreateIsOpen } = useContext(DataContext);

  return hikes && (
    <section className="hikeslist">
      <div className="hikeslist__header">
        <h2 className="heading heading--myhikes"><IoFootsteps /> My Hikes</h2>
        <Search />
        <div className="hikeslist__filters">
          <FilterTime />
          <FilterSort />
        </div>

        <button className="btn btn--addHike" onClick={() => setCreateIsOpen(true)}><IoAddCircle /> <span>Add New Hike</span></button>
      </div>

      <div className="hikeslist__list">
        {hikes?.length > 0 ? hikes.map(hike => <HikeItem hike={hike} key={hike._id} />) : <p>No hikes found.</p>}
      </div>

    </section>
  );
};
export default HikesList;