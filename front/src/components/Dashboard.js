import { useEffect, useState } from "react";
import CreateHike from "./CreateHike";
import HikesList from "./HikesList";

const Dashboard = ({ user, handleLogout }) => {
  const [loading, setLoading] = useState(true);
  const [hikes, setHikes] = useState([]);

  const handleCreateHike = async (newHike) => {
    setLoading(true);
    try {
      const HIKES_URI = 'http://localhost:5000/api/hikes';
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ ...newHike, user: user.id })
      };
      let resp = await fetch(HIKES_URI, fetchOptions);
      let body = await resp.json();
      if (resp.status === 201) {
        setLoading(false);
        setHikes([...hikes, newHike]);
      } else {
        console.log(resp.status, resp.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchHikes = async () => {
      try {
        const HIKES_URI = 'http://localhost:5000/api/hikes';
        const fetchOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
        };
        let resp = await fetch(HIKES_URI, fetchOptions);
        let body = await resp.json();
        if (resp.ok) {
          setLoading(false);
          setHikes(body);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchHikes();
  }, [user]);
  return (
    <>
      {!loading && (
        <section>
          <h2>Welcome, {user.name}!</h2>
          <button onClick={handleLogout}>Log Out</button>
          <HikesList hikes={hikes} />
          <CreateHike handleCreateHike={handleCreateHike} />
        </section>)}
      {loading && (
        <p>Loading... </p>
      )}
    </>
  );
};
export default Dashboard;