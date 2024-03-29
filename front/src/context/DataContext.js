import { createContext, useState, useEffect } from "react";
import dayjs from "dayjs";

const DataContext = createContext({});
const URI_BASE = process.env.NODE_ENV === 'production' ? 'https://footsteps-app.herokuapp.com/api/hikes' : 'http://localhost:5001/api/hikes';

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [hikeToEdit, setHikeToEdit] = useState({});
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hikes, setHikes] = useState([]);
  const [alert, setAlert] = useState({});
  const [initialHikes, setInitialHikes] = useState([]);
  const [filterTime, setFilterTime] = useState("30");
  const [sortBy, setSortBy] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('fs-user')) {
      const user = JSON.parse(localStorage.getItem('fs-user'));
      setUser(user);
      setAlert({
        type: 'info',
        message: `👋  Welcome back, ${user.name}!`
      });
    }
  }, [setUser]);

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem('fs-user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser({});
    localStorage.removeItem('fs-user');
  };

  // ADD or EDIT a hike
  const handleFetch = async (method, addToURI = '', body = {}) => {
    if (!user?.token) return false;
    try {
      const HIKES_URI = `${URI_BASE}${addToURI}`;
      const fetchOptions = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: method === 'POST' || method === 'PUT' ? JSON.stringify(body) : undefined
      };
      let resp = await fetch(HIKES_URI, fetchOptions);
      let respBody = await resp.json();
      if (resp.ok) {
        return respBody;
      }
    } catch (error) {
      return { error };
    }
  };

  // GET all Hikes
  useEffect(() => {
    const fetchHikes = async () => {
      if (!user?.token) return false;
      try {
        const HIKES_URI = URI_BASE;
        const fetchOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
        };
        let resp = await fetch(HIKES_URI, fetchOptions);
        let respBody = await resp.json();
        if (resp.status === 200) {
          setLoading(false);
          setHikes(respBody);
          console.log(respBody);
          setInitialHikes(respBody);
        } else {
          handleLogout();
          window.location = '/';
        }
      } catch (error) {
        console.log('ERROR fetching hikes');
        handleLogout();
        window.location = '/';
        return { error };
      }
    };
    fetchHikes();
  }, [user.token]);

  useEffect(() => {
    // re-sort hikes
    let newHikes = [...initialHikes];
    if (sortBy === 0) {
      //oldest first
      newHikes.sort((a, b) => new Date(b.date) - new Date(a.date));
      setInitialHikes(newHikes);
    }
    if (sortBy === 1) {
      //newest first
      newHikes.sort((a, b) => new Date(a.date) - new Date(b.date));
      setInitialHikes(newHikes);
    }
    if (sortBy === 2) {
      // by distance
      newHikes.sort((a, b) => b.distance - a.distance);
      setInitialHikes(newHikes);
    }
    if (sortBy === 3) {
      // by distance
      newHikes.sort((a, b) => a.distance - b.distance);
      setInitialHikes(newHikes);
    }
  }, [sortBy]);

  // Set time filter
  useEffect(() => {
    const dates = {
      "30": dayjs().subtract(30, 'd'),
      "60": dayjs().subtract(60, 'd'),
      "90": dayjs().subtract(90, 'd'),
      "year": dayjs(`${dayjs().format('YYYY')}-01-01`),
    };
    if (filterTime === "all") {
      setHikes(initialHikes);
    } else {
      setHikes(initialHikes.filter(hike => dayjs(hike.date).isAfter(dates[filterTime])));
    }
  }, [filterTime, initialHikes]);

  const parseDate = (date) => {
    let dt = new Date(date);
    return dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
  };



  return (
    <DataContext.Provider value={{
      user, setUser, handleLogin, handleLogout, handleFetch,
      hikes, setHikes,
      loading, setLoading,
      hikeToEdit, setHikeToEdit,
      createIsOpen, setCreateIsOpen,
      alert, setAlert,
      initialHikes, setInitialHikes,
      filterTime, setFilterTime,
      sortBy, setSortBy,
      parseDate
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;