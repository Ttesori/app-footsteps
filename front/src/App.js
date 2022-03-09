import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Routes>
          <Route index path='/*' element={<Login />} />
          <Route path='/hikes' element={<Dashboard />} />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
