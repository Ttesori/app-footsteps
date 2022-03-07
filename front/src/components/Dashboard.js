import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CreateHike from "./CreateHike";
import HikesList from "./HikesList";
import DataContext from '../context/DataContext';
import Alert from "./Alert";

const Dashboard = () => {

  const { handleLogout, user, loading, createIsOpen, handleFetch, setLoading, setHikes, setInitialHikes } = useContext(DataContext);
  const navigate = useNavigate();

  const handleLocalLogout = () => {
    handleLogout();
    navigate('/login');
  };

  useEffect(() => {
    console.log('fetching hikes');
    const fetchHikes = async () => {
      const resp = await handleFetch('GET');
      if (resp?.length) {
        setLoading(false);
        setHikes(resp);
        setInitialHikes(resp);
      }
    };
    fetchHikes();
  }, [user]);

  return (
    <>
      {!loading && (
        <section>
          {alert?.type && <Alert type={alert.type} message={alert.message} />}
          <h2>Welcome, {user.name}!</h2>
          <button onClick={handleLocalLogout}>Log Out</button>
          <HikesList />
          {createIsOpen &&
            <CreateHike />}
        </section>)}
      {loading && (
        <p>Loading... </p>
      )}
    </>
  );
};
export default Dashboard;