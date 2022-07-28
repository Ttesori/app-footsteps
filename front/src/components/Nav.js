import { useState, useContext } from 'react';
import DataContext from '../context/DataContext';
import { IoMenuSharp, IoClose } from 'react-icons/io5';

const Nav = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { handleLogout } = useContext(DataContext);
  const localHandleLogout = (e) => {
    e.preventDefault();
    setNavOpen(false);
    handleLogout();
  };
  return (
    <>
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
    </>
  );
};
export default Nav;