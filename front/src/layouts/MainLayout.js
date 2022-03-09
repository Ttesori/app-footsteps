const MainLayout = ({ children }) => {
  return (
    <>
      <header>
        <div className="container">
          <h1>Footsteps</h1>
        </div>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>Written by Toni</p>
      </footer>
    </>
  );
};
export default MainLayout;