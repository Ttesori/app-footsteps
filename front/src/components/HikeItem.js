import dayjs from "dayjs";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import '../css/HikeItem.css';
import { IoLocationSharp } from "react-icons/io5";
import { FaClock, FaEdit } from "react-icons/fa";

const HikeItem = ({ hike }) => {
  const { hikes, setHikeToEdit, setCreateIsOpen, parseDate } = useContext(DataContext);

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
          {hike.date &&
            <li className="hike-details__date">
              <FaClock />
              {dayjs(parseDate(hike.date)).format('MM/DD/YYYY')}
            </li>}
          <li className="hike-details__location">
            <IoLocationSharp />
            {hike.location}
          </li>
        </ul>
      </div>

      {hike.distance && <div className="hike-item__distance">{hike.distance}<span className="hike-distance__unit">mi</span></div>}
      <p className="hike-item__notes">{hike.notes}</p>
      <button onClick={() => handleEditHike(hike._id)} className="btn btn--hike-edit"><FaEdit /> <span className="sr-only">Edit</span></button>
    </section>
  );
};
export default HikeItem;