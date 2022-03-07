import { useContext } from "react";
import DataContext from "../context/DataContext";

const HikeItem = ({ hike }) => {
  const { hikes, setHikeToEdit, setCreateIsOpen } = useContext(DataContext);

  const formatDate = (d) => {
    const date = new Date(d);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    return `${month}/${dt}/${year}`;
  };

  const handleEditHike = (id) => {
    const selectedHike = hikes.filter(hike => hike._id === id)[0];
    setHikeToEdit(selectedHike);
    setCreateIsOpen(true);
  };

  return (
    <section>
      <h3>{hike.title}</h3>
      <ul>
        {hike.date && <li>{formatDate(hike.date)}</li>}
        <li>{hike.location}</li>
        {hike.distance && <li>{hike.distance}mi</li>}
      </ul>
      <p>{hike.notes}</p>
      <button onClick={() => handleEditHike(hike._id)}>Edit</button>
    </section>
  );
};
export default HikeItem;