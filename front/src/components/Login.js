import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import "../css/Login.css";
import { FaArrowCircleRight, FaPlus, FaUnlock } from "react-icons/fa";

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const { handleLogin, user, setHikes, handleFetch, setLoading, setInitialHikes, handleLogout } = useContext(DataContext);
  const URL_PRE = process.env.NODE_ENV === 'production' ? 'https://footsteps-app.herokuapp.com/api/users' : 'http://localhost:5001/api/users';

  const handleSwitch = (e) => {
    if (register) return handleRegister(e);
    handleSubmit(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send request to API
    const LOGIN_URI = `${URL_PRE}/login`;
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

  const handleRegister = async (e) => {
    e.preventDefault();

    // Send request to API
    const REGISTER_URI = URL_PRE;
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, pwd })
    };

    try {
      let resp = await fetch(REGISTER_URI, fetchOptions);
      let body = await resp.json();
      if (resp.status === 201) {
        // Sign in successful
        handleLogin(body);
        setErrorMsg('');
        setLoading(false);
        setHikes([]);
        setInitialHikes([]);
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
      <h2>{register ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSwitch}>
        {errorMsg && <p className="alert alert--error">{errorMsg}</p>}
        {register && <>
          <div className="form__group">
            <label htmlFor="name" className="form__label">Name</label>
            <input type="text" name="name" id="name" value={name}
              onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="form__control" required />
          </div>
        </>}
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
        <button className="btn--login" type='submit'>{!register && <FaArrowCircleRight />}{register ? 'Sign Up' : 'Sign In'}</button>
        {!register ? <button className="btn--register" onClick={() => setRegister(true)}><FaPlus /> Sign Up</button> : <button className="btn--register" onClick={() => setRegister(false)}><FaUnlock /> Sign In</button>}
      </form>
    </section>
  );
};

export default Login;