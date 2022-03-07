import { useEffect, useState, useContext } from "react";
import DataContext from "../context/DataContext";
import HikeItem from "./HikeItem";

const HikesList = () => {
  const [hikesList, setHikesList] = useState([]);
  const { hikes, setHikeToEdit, setCreateIsOpen } = useContext(DataContext);

  useEffect(() => {
    if (hikes.length > 0) setHikesList(hikes.map(hike => <HikeItem hike={hike} key={hike._id} />));
  }, [hikes, setHikeToEdit]);

  return hikes && (
    <section>
      <h2>My Hikes</h2>
      <button onClick={() => setCreateIsOpen(true)}>Add New Hike</button>
      {hikesList}
    </section>
  );
};
export default HikesList;