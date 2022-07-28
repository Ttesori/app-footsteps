import '../css/Layout.css';
import { useContext } from 'react';
import DataContext from '../context/DataContext';
import Nav from '../components/Nav';

const MainLayout = ({ children }) => {
  const { user } = useContext(DataContext);

  return (
    <>
      <header className='header'>
        <div className="container">
          <h1 className="header__logo">Footsteps</h1>
        </div>
      </header>
      {user._id && <Nav />}
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