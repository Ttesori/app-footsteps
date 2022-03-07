import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path='/*' element={<Login />} />
        <Route path='/hikes' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
