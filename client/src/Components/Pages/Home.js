import React, { useEffect, useState } from 'react';
import { postPlacesGetting } from '../axios/apiaxios';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import css from '../Css/Centralize';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Home = () => {
  const [hasRefresh, setHasRefresh] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { getPlaces } = useSelector((state) => state.user);
  // console.log(getPlaces);

  useEffect(() => {
    if (hasRefresh) {
      dispatch(postPlacesGetting());
    } else {
      setHasRefresh(true);
    }
  }, [dispatch, hasRefresh, location]);

  setInterval(() => {
    localStorage.removeItem('token');
  }, 60 * 60 * 1000); // 60 minutes * 60 seconds * 1000 milliseconds

  return (
    <css.Home>
      {getPlaces !== null &&
        getPlaces.map((item, index) => (
          <Link
            to={`/${item._id}`}
            key={index}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <article>
              <div className='homeImage'>
                {item.photos.length >= 0 && (
                  <img
                    src={item.photos[1] || item.photos[0]}
                    alt='your houses'
                  />
                )}
                <div className='homeTitle'>
                  <h1 style={{ margin: '0px', marginTop: '10px' }}>
                    {item.title}
                  </h1>
                </div>
              </div>

              <div>
                <p>
                  <span>Description : </span>
                  {item.description.toUpperCase()}
                </p>
                <p style={{ fontWeight: 'bold' }}>
                  <span>Address : </span>
                  {item.address.toUpperCase()}
                </p>
                <p>
                  <span>ExtraInfo : </span>
                  {item.extraInfo.toUpperCase()}
                </p>
                <h3
                  style={{ margin: '0px' }}
                >{`$ ${item.price.toUpperCase()} Per Night`}</h3>
              </div>
              <div>
                {item.perks.length >= 0 && (
                  <ul style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Perks :</span>
                    {item.perks.map((items, index) => (
                      <li
                        key={index}
                        style={{
                          listStyle: 'none',
                          marginTop: '0px',
                          marginLeft: '10px',
                          fontSize: '20px',
                        }}
                      >
                        {items}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </Link>
        ))}
    </css.Home>
  );
};

export default Home;
