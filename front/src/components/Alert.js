import { useContext, useEffect } from "react";
import DataContext from "../context/DataContext";
import "../css/Alert.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = () => {
  const { setAlert, alert } = useContext(DataContext);
  useEffect(() => {
    if (alert?.type) {
      setTimeout(() => {
        setAlert({});
      }, 30000);
    }
  }, [alert, setAlert]);

  return (
    <p className={`alert alert--${alert.type}`} role="alert">
      {alert.message}
    </p>
  );
};
export default Alert;