import React from 'react';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import css from '../Css/Centralize';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailsForShowProfile } from '../axios/apiaxios';
import { removeUser } from '../Redux/UserSlice';
import PlacesPage from './PlacesPage';

const AccountPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasRefresh, setHasRefresh] = useState(false);

  useEffect(() => {
    // HAS REFRESH MEANS TWO THREE  TIME  RENDER THE USEEFFECT, WHE BECAUSE FIRST TIME USEEFFECT MOUNT AT THE TIME ONE AND SENCOND TIME THE LOCALSTORAGE CHECKING AT THE TIME ONCE SO MANY TIME IF USING SOME STATE VALUE INSIDE OF THE USEEFFECT THAT WILL GETTING EXPECTED OUTPT
    if (hasRefresh) {
      const storedUser = JSON.parse(localStorage.getItem('token'));
      // console.log(storedUser.username);
      if (location.pathname === '/account') {
        navigate('/account/profile');
      }
      dispatch(getUserDetailsForShowProfile(storedUser.username));
    } else {
      setHasRefresh(true);
    }
  }, [location.pathname, dispatch, hasRefresh, navigate]);

  const { getDataUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    navigate('/login');
    localStorage.removeItem('token');
  };

  const { pages } = useParams();

  return (
    <css.Container>
      <css.Nav>
        <div>
          <Link
            to={'/account/profile'}
            style={{
              textDecoration: 'none',
              color: 'black',
              fontSize: '17px',
            }}
          >
            My Profile
          </Link>
        </div>
        <div>
          <Link
            to={'/account/booking'}
            style={{
              textDecoration: 'none',
              color: 'black',
              fontSize: '17px',
            }}
          >
            My Booking
          </Link>
        </div>
        <div>
          <Link
            to={'/account/places'}
            style={{
              textDecoration: 'none',
              color: 'black',
              fontSize: '17px',
            }}
          >
            My Accommodation
          </Link>
        </div>
      </css.Nav>
      <css.AccountProfile>
        <article>
          {location.pathname === '/account/profile' && (
            <>
              <h3>Your Email {getDataUser.email} </h3>
              <h3>Your UserName is {getDataUser.username}</h3>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </article>
        <div>
          {pages === 'places' && (
            <>
              {' '}
              <PlacesPage />{' '}
            </>
          )}
        </div>
      </css.AccountProfile>
    </css.Container>
  );
};

export default AccountPage;
