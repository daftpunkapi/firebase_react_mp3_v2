import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Signin from './pages/Signin';
import Account from './pages/Account';
import Room1 from './pages/Room1';
import Room2 from './pages/Room2';
import Protected from './components/Protected'

function App() {
  return (
    <div className='App'>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/accountpage' element={<Protected><Account /></Protected>} />
          <Route path='/accountpage/room1' element={<Protected><Room1 /></Protected>} />
          <Route path='/accountpage/room2' element={<Protected><Room2 /></Protected>} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
