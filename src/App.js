import logo from './logo.svg';
import './App.css';
import './fonts.css';
import CreateCampaign from './components/CreateCampaign/CreateCampaign';
import Auth from './components/Auth/Auth';
import { BrowserRouter, Switch, Link, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Header from './components/Navbar/Header';
import ClaimPage from './components/ClaimPage/ClaimPage';
import Welcome from './components/Welcome/Welcome';
import { myContext } from './components/Context';
import { useContext } from 'react';
import axios from 'axios';
import LoadingScreen from './components/LoadingScreen';
import ProtectedRoute from './components/ProtectedRoute';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true;

function App() {
  const {user, isUserLoading} = useContext(myContext);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            exact
            element={
              isUserLoading ? (
                <LoadingScreen />
              ) : (
                <ProtectedRoute>
                  <Welcome />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path='/createcampaign'
            exact
            element={
              isUserLoading ? (
                <LoadingScreen />
              ) : (
                <ProtectedRoute>
                  <CreateCampaign />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path='/profile'
            exact
            element={
              isUserLoading ? (
                <LoadingScreen />
              ) : (
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path='/claim'
            exact
            element={
              isUserLoading ? (
                <LoadingScreen />
              ) : (
                <ProtectedRoute>
                  <ClaimPage />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path='/auth'
            exact
            element={isUserLoading ? <LoadingScreen /> : <Auth />}
          />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
