import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateHike from "./CreateHike";
import HikesList from "./HikesList";

const Dashboard = ({ user, handleLogout }) => {
  const [loading, setLoading] = useState(true);
  const [hikes, setHikes] = useState([]);
  const [hikeToEdit, setHikeToEdit] = useState({});
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseCreate = () => {
    setCreateIsOpen(false);
    setHikeToEdit({});
  };

  const handleEditHike = (id) => {
    const selectedHike = hikes.filter(hike => hike._id === id)[0];
    setHikeToEdit(selectedHike);
    setCreateIsOpen(true);
  };

  const handleCreateHike = async (newHike) => {
    setLoading(true);
    setCreateIsOpen(true);
    try {
      const HIKES_URI = 'http://localhost:5000/api/hikes';
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(newHike)
      };
      let resp = await fetch(HIKES_URI, fetchOptions);
      let body = await resp.json();
      console.log(body);
      if (body._id && !body.error) {
        setLoading(false);
        setHikes([...hikes, body]);
      } else {
        console.log(resp.status, resp.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateHike = async (updateHike) => {
    setLoading(true);
    try {
      const HIKES_URI = `http://localhost:5000/api/hikes/${hikeToEdit._id}`;
      const fetchOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ ...updateHike })
      };
      let resp = await fetch(HIKES_URI, fetchOptions);
      let body = await resp.json();
      console.log(body);
      if (body._id && !body.error) {
        setLoading(false);
        const newHikes = hikes.filter(hike => hike._id !== hikeToEdit._id);
        setHikes([...newHikes, body]);
      } else {
        console.log(resp.status, resp.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteHike = async (hikeId) => {
    setLoading(true);
    try {
      const HIKES_URI = `http://localhost:5000/api/hikes/${hikeId}`;
      const fetchOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      };
      let resp = await fetch(HIKES_URI, fetchOptions);
      let body = await resp.json();
      console.log(body);
      if (resp.status === 200) {
        setLoading(false);
        const newHikes = hikes.filter(hike => hike._id !== hikeId);
        setHikes([...newHikes]);
      } else {
        console.log(resp.status, resp.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocalLogout = () => {
    handleLogout();
    navigate('/login');
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
          console.log('hikes', body);
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
          <button onClick={handleLocalLogout}>Log Out</button>
          <HikesList hikes={hikes} handleEditHike={handleEditHike} handleAddNew={() => setCreateIsOpen(true)} />
          {createIsOpen &&
            <CreateHike handleCreateHike={handleCreateHike} handleUpdateHike={handleUpdateHike} handleDeleteHike={handleDeleteHike} hike={hikeToEdit} handleClose={handleCloseCreate} />}
        </section>)}
      {loading && (
        <p>Loading... </p>
      )}
    </>
  );
};
export default Dashboard;