import '../css/Layout.css';
import { useState, useContext } from 'react';
import { IoMenuSharp, IoClose } from 'react-icons/io5';
import DataContext from '../context/DataContext';

const MainLayout = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const { handleLogout } = useContext(DataContext);
  const localHandleLogout = (e) => {
    e.preventDefault();
    setNavOpen(false);
    handleLogout();
  };

  return (
    <>
      <header className='header'>
        <div className="container">
          <h1 className="header__logo">Footsteps</h1>
        </div>
      </header>
      <nav className={`nav ${navOpen ? 'nav--open' : 'nav--closed'}`}>
        <button className="nav__btn" onClick={() => setNavOpen(!navOpen)}>
          <span>Menu</span> {navOpen ? <IoClose /> : <IoMenuSharp />}
        </button>
        <menu className={`nav__list`}>
          <li className="nav__list-item">
            <a href="/logout" className="nav__list-link" onClick={localHandleLogout}>Log Out</a>
          </li>
        </menu>
      </nav>
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        <p>Written by <a href="https://tonitesori.dev/">Toni</a></p>
      </footer>
    </>
  );
};
export default MainLayout;