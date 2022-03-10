import '../css/Layout.css';
import { useState } from 'react';
import { IoMenuSharp, IoClose } from 'react-icons/io5';

const MainLayout = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);
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
            <a href="#" className="nav__list-link">Log Out</a>
          </li>
        </menu>
      </nav>
      <main className="main">
        {children}
      </main>
      <footer>
        <p>Written by Toni</p>
      </footer>
    </>
  );
};
export default MainLayout;