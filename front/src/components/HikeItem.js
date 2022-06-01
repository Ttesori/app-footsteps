import { useContext } from "react";
import DataContext from "../context/DataContext";
import '../css/HikeItem.css';

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
    <section className="hike-item">
      <div className="hike-item__title-group">
        <h3 className="hike-item__title">{hike.title}</h3>
        <ul className="hike-item__details">
          {hike.date && <li className="hike-details__date">{formatDate(hike.date)}</li>}
          <li className="hike-details__location">{hike.location}</li>
        </ul>
      </div>

      {hike.distance && <div className="hike-item__distance">{hike.distance}<span className="hike-distance__unit">mi</span></div>}
      <p className="hike-item__notes">{hike.notes}</p>
      <button onClick={() => handleEditHike(hike._id)} className="btn btn--hike-edit">Edit</button>
    </section>
  );
};
export default HikeItem;