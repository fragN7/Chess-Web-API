import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Champion } from './Champion/Champion';
import { Home } from './Home';
import { Navigation } from './Navigation';
import { Participation } from './Participation/Participation';
import { Player } from './Player/Player';
import { RatingStats } from './Reports/RatingStats';
import { TrophyStats } from './Reports/TrophyStats';
import { Login } from './Login/Login';
import { Register } from './Login/Register';
import {Tournament} from "./Tournament/Tournament";
import { User } from './Login/User';
import {Chat} from "./Chat/Chat";

function App() {
  const [username, setUsername] = useState('');
  const [userid, setUserid] = useState('');
  const [rows, setRows] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserid = localStorage.getItem('userid');
    const storedRows = localStorage.getItem('rows');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedUserid) {
      setUserid(storedUserid);
    }
    if (storedRows) {
      setUserid(storedRows);
    }
  }, []);

  function handleLogin(user, userid) {
    setUsername(user);
    localStorage.setItem('username', user);
    setUsername(userid);
    localStorage.setItem('userid', userid);
  }

  function handleLogout() {
    setUsername('');
    localStorage.removeItem('username');
    setUserid('');
    localStorage.removeItem('userid');
    setRows(5);
    localStorage.removeItem('rows');
  }

  function handleSelectedRows(rows) {
    setRows(rows);
    localStorage.setItem('rows', rows);
  }

  return (
      <BrowserRouter>
        <div className="container">
          <h3 className="m-3 d-flex justify-content-center">Chess SDI</h3>
          <Navigation username={username} userid={userid} handleLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/players' element={<Player username={username} rows={rows}/>} />
            <Route path="/champions" element={<Champion username={username} rows={rows}/>} />
            <Route path="/tournaments" element={<Tournament username={username} rows={rows}/>} />
            <Route path="/participations" element={<Participation username={username} rows={rows}/>} />
            <Route path="/players/trophies" element={<TrophyStats />} />
            <Route path="/players/ratings" element={<RatingStats />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat username={username} />} />
            <Route path="/users/:userid" element={<User username={username} onSelectedRows={handleSelectedRows}/>} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
