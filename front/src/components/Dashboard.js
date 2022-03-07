import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CreateHike from "./CreateHike";
import HikesList from "./HikesList";
import DataContext from '../context/DataContext';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [hikes, setHikes] = useState([]);
  const [hikeToEdit, setHikeToEdit] = useState({});
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const { handleLogout, user, handleFetch } = useContext(DataContext);
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

    let body = await handleFetch('POST', '', newHike);
    if (body._id && !body.error) {
      setLoading(false);
      setHikes([...hikes, body]);
    } else {
      console.log(body);
    }
  };

  const handleUpdateHike = async (updateHike) => {
    setLoading(true);
    let body = await handleFetch('PUT', `/${hikeToEdit._id}`, updateHike);
    if (body._id && !body.error) {
      setLoading(false);
      const newHikes = hikes.filter(hike => hike._id !== hikeToEdit._id);
      setHikes([...newHikes, body]);
    } else {
      console.log(body);
    }
  };

  const handleDeleteHike = async (hikeId) => {
    setLoading(true);
    let body = await handleFetch('DELETE', `/${hikeToEdit._id}`);
    if (body.id) {
      setLoading(false);
      const newHikes = hikes.filter(hike => hike._id !== hikeId);
      setHikes([...newHikes]);
    } else {
      console.log(body);
    }
  };

  const handleLocalLogout = () => {
    handleLogout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchHikes = async () => {
      const resp = await handleFetch('GET');
      if (resp?.length) {
        setLoading(false);
        setHikes(resp);
      }
    };
    fetchHikes();
  }, [handleFetch]);

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