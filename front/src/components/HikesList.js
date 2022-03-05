import { useEffect, useState } from "react";

const HikesList = ({ hikes }) => {
  const [hikesList, setHikesList] = useState([]);

  useEffect(() => {
    if (hikes.length > 0) setHikesList(hikes.map(hike => <p key={hike._id}>{hike.title}</p>));
  }, [hikes]);

  useEffect(() => { console.log(hikesList); }, [hikesList]);

  return hikes && (
    <section>
      <h2>My Hikes</h2>
      {hikesList}
    </section>
  );
};
export default HikesList;