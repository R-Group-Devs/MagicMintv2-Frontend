import logo from './logo.svg';
import './App.css';
import Campaign from './components/Campaign/Campaign';
import Auth from './components/Auth/Auth';
import { BrowserRouter, Switch, Link, Routes, Route  } from "react-router-dom";
import Profile from './components/Profile/Profile';
import Header from './components/Navbar/Header';


function App() {






  return (
    <div >


<BrowserRouter>
  <Routes>
      <Route path="/" element={<Auth/>}/>
      <Route path="/auth" exact element={<Auth/>}/>
      <Route path="/campaign" exact element={<Campaign/>}/> \
      <Route path="/profile" exact element={<Profile/>}/> \

  </Routes>
</BrowserRouter>

    </div>
  );
}

export default App;
