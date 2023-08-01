import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Pages/Navbar';
import Login from './Components/Pages/Login';
import Home from './Components/Pages/Home';
import Register from './Components/Pages/Register';
import AccountPage from './Components/Pages/AccountPage';
import PlacesFormPage from './Components/Pages/PlacesFormPage';
import PlacePageById from './Components/Pages/PlacePageById';

function App() {
  const user = JSON.parse(localStorage.getItem('token'));

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/:id' element={<PlacePageById />}></Route>
          <Route
            element={
              !user ? (
                <Login />
              ) : (
                <>
                  <Navigate to={'/'} />
                </>
              )
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account/:pages?' element={<AccountPage />}></Route>
          <Route path='/account/places/:id' element={<PlacesFormPage />} />
          {/* <Route path='/account/:pages' element={<AccountPage />}></Route> */}
          <Route
            path='/account/:pages/:action'
            element={<AccountPage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
