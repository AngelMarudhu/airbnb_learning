import React, { useState } from 'react';
import css from '../Css/Centralize';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [loginShow, setLoginShow] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { userValue } = useSelector((state) => state.user);
  // console.log(userValue);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('token'));
    // console.log(storedUser);

    
    if (storedUser?.username) {
      setLoginShow(storedUser.username);
    }
  }, [location, setLoginShow]);

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/register') {
      setLoginShow(null);
      localStorage.removeItem('token');
    }
  }, [setLoginShow, location]);

  return (
    <css.Container>
      <css.Headers>
        <a href='/'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
            />
          </svg>
          <span>Marudhu</span>
        </a>
        <css.SearchInput>
          <div>Anywhere</div>
          <div>Any Week</div>
          <div style={{ color: 'grey' }}>Add Guests</div>
          <button>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </button>
        </css.SearchInput>
        <css.profile>
          <div>
            {loginShow ? (
              <>
                {' '}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
                  />
                </svg>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
                <Link to={'/account'}>
                  <span>{loginShow}</span>
                </Link>
              </>
            ) : (
              <Link to={'/login'}>
                <button style={{ cursor: 'pointer' }}>Login</button>
              </Link>
            )}
          </div>
        </css.profile>
      </css.Headers>
    </css.Container>
  );
};

export default Navbar;
