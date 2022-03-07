import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CreateHike from "./CreateHike";
import HikesList from "./HikesList";
import DataContext from '../context/DataContext';
import Alert from "./Alert";

const Dashboard = () => {

  const { handleLogout, user, handleFetch, setLoading, setHikes, loading, createIsOpen } = useContext(DataContext);
  const navigate = useNavigate();

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
  }, [handleFetch, setHikes, setLoading]);

  return (
    <>
      {!loading && (
        <section>
          {alert && <Alert type={alert.type} message={alert.message} />}
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