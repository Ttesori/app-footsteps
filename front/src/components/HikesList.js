import { useEffect, useState } from "react";

const HikesList = ({ hikes, handleEditHike, handleAddNew }) => {
  const [hikesList, setHikesList] = useState([]);

  const formatDate = (d) => {
    const date = new Date(d);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    return `${month}/${dt}/${year}`;
  };

  useEffect(() => {
    if (hikes.length > 0) setHikesList(hikes.map(hike => (
      <section key={hike._id}>
        <h3>{hike.title}</h3>
        <ul>
          {hike.date && <li>{formatDate(hike.date)}</li>}
          <li>{hike.location}</li>
          {hike.distance && <li>{hike.distance}mi</li>}
        </ul>
        <p>{hike.notes}</p>
        <button onClick={() => handleEditHike(hike._id)}>Edit</button>
      </section>
    )));
  }, [hikes, handleEditHike,]);

  useEffect(() => { console.log(hikesList); }, [hikesList]);

  return hikes && (
    <section>
      <h2>My Hikes</h2>
      <button onClick={handleAddNew}>Add New Hike</button>
      {hikesList}
    </section>
  );
};
export default HikesList;