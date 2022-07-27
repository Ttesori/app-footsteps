import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import "../css/Login.css";
import { FaArrowCircleRight } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { handleLogin, user, setHikes, handleFetch, setLoading, setInitialHikes, handleLogout } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send request to API
    const LOGIN_URI = 'http://localhost:5001/api/users/login';
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password: pwd })
    };

    try {
      let resp = await fetch(LOGIN_URI, fetchOptions);
      let body = await resp.json();
      if (resp.status === 200) {
        // Sign in successful
        handleLogin(body);
        // GET hikes
        const resp2 = await handleFetch('GET');
        if (resp2?.length) {
          setLoading(false);
          setHikes(resp);
          setInitialHikes(resp);
        }
        navigate('/hikes');
      } else {
        console.log('ERROR', resp);
        handleLogout();
        setErrorMsg(`${body.error}`);
        navigate('/');
      }
    } catch (error) {
      handleLogout();
      console.log('ERROR');
      navigate('/login');
    }
  };

  useEffect(() => {
    if (user._id) {
      navigate('/hikes');
    }
  }, [navigate, user._id]);

  return (
    <section className="login">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        {errorMsg && <p className="alert alert--error">{errorMsg}</p>}
        <div className="form__group">
          <label htmlFor="email" className="form__label">Email</label>
          <input type="email" name="email" id="email" value={email}
            onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com" className="form__control" required />
        </div>
        <div className="form__group">
          <label htmlFor="pwd">Password</label>
          <input type="password" name="pwd" id="pwd"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            placeholder="Enter your password"
            className="form__control"
            required />
        </div>
        <button className="btn--login"><FaArrowCircleRight /> Sign In</button>
      </form>
    </section>
  );
};

export default Login;