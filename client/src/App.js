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
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import Task from './pages/Task';
import NewTask from './pages/TaskCreate';

function App() {
  const { loggedIn } = useAuth();
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
            <Route path="/profile" element={
              <ProtectedRoute isAuthenticated={loggedIn}>
                <Profile />
              </ProtectedRoute>
            }
            />
            <Route path="/task" element={<Task/>} />
            <Route path="/task/create" element={<NewTask/>}/>

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
