import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Calender from './pages/Calender';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

function App() {
  return (
    <Router>
      <div>

        <Navbar />

        <div id="content">
          <Routes>
            <Route path="/calender" element={<Calender />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Home />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
