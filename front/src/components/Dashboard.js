import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateHike from "./CreateHike";
import HikesList from "./HikesList";
import DataContext from '../context/DataContext';
import Alert from "./Alert";


const Dashboard = () => {

  const { user, loading, createIsOpen, alert } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user._id) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      {!loading && (
        <>
          {alert?.type && <Alert type={alert.type} message={alert.message} />}
          <HikesList />
          {createIsOpen &&
            <CreateHike />}
        </>)}
      {loading && (
        <p>Loading... </p>
      )}
    </>
  );
};
export default Dashboard;