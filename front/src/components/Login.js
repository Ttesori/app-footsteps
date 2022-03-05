import { useState } from 'react';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send request to API
    const LOGIN_URI = 'http://localhost:5000/api/users/login';
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password: pwd })
    };
    let resp = await fetch(LOGIN_URI, fetchOptions);
    let body = await resp.json();
    if (resp.status === 200) {
      // Sign in successful
      handleLogin(body);
    } else {
      setErrorMsg(`${body.error}`);
    }
  };
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
        <button>Sign In</button>
      </form>
    </section>
  );
};

export default Login;