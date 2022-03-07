import { useContext, useEffect } from "react";
import DataContext from "../context/DataContext";

const Alert = () => {
  const { setAlert, alert } = useContext(DataContext);
  useEffect(() => {
    if (alert?.type) {
      setTimeout(() => {
        setAlert({});
      }, 3000);
    }
  }, [alert, setAlert]);

  return (
    <p className={`alert alert--${alert.type}`} role="alert">
      {alert.message}
    </p>
  );
};
export default Alert;