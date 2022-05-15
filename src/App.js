import logo from './logo.svg';
import './App.css';
import './fonts.css';
import CreateCampaign from './components/CreateCampaign/CreateCampaign';
import Auth from './components/Auth/Auth';
import { BrowserRouter, Switch, Link, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Header from './components/Navbar/Header';
import ClaimPage from './components/ClaimPage/ClaimPage';
import Welcome from './components/Welcome/Welcome';
import { myContext } from './components/Context';
import { useContext } from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true;

function App() {
  const userObject = useContext(myContext);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/auth' exact element={<Auth />} />
          <Route path='/createcampaign' exact element={<CreateCampaign />} />
          <Route path='/profile' exact element={<Profile />} />
          <Route path='/welcome' exact element={<Welcome />} />
          <Route path='/claim' exact element={<ClaimPage />} /> \
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
