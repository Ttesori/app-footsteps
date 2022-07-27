import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [hikeToEdit, setHikeToEdit] = useState({});
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hikes, setHikes] = useState([]);
  const [alert, setAlert] = useState({});
  const [initialHikes, setInitialHikes] = useState([]);
  const [filterTime, setFilterTime] = useState(0);
  const [sortBy, setSortBy] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('fs-user')) {
      const user = JSON.parse(localStorage.getItem('fs-user'));
      setUser(user);
      setAlert({
        type: 'info',
        message: `👋 Welcome back, ${user.name}!`
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

  const handleFetch = async (method, addToURI = '', body = {}) => {
    if (!user?.token) return false;
    try {
      console.log('fetching something');
      const HIKES_URI = `http://localhost:5001/api/hikes${addToURI}`;
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

  useEffect(() => {
    const fetchHikes = async () => {
      if (!user?.token) return false;
      try {
        console.log('fetching hikes');
        const HIKES_URI = `http://localhost:5001/api/hikes`;
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
    console.log(alert);
  }, [alert]);

  useEffect(() => {
    // re-sort hikes
    let newHikes = [...hikes];
    console.log(sortBy);
    console.log(newHikes);
    if (sortBy === 0) {
      //oldest first
      newHikes.sort((a, b) => new Date(b.date) - new Date(a.date));
      console.log(newHikes);
      setHikes(newHikes);
    }

    if (sortBy === 1) {
      //newest first
      newHikes.sort((a, b) => new Date(a.date) - new Date(b.date));
      console.log(newHikes);
      setHikes(newHikes);
    }

    if (sortBy === 2) {
      // by distance
      newHikes.sort((a, b) => b.distance - a.distance);
      setHikes(newHikes);
    }

    if (sortBy === 3) {
      // by distance
      newHikes.sort((a, b) => a.distance - b.distance);
      setHikes(newHikes);
    }
  }, [sortBy]);


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
      sortBy, setSortBy
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;