import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import css from '../Css/Centralize';
import { useDispatch } from 'react-redux';
import { postPlacesGetting } from '../axios/apiaxios';
import PlacesFormPage from './PlacesFormPage';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const PlacesPage = () => {
  const { action } = useParams();
  const [hasRefresh, setHasRefresh] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { getPlaces } = useSelector((state) => state.user);

  // console.log(getPlaces);

  useEffect(
    () => {
      if (hasRefresh) {
        dispatch(postPlacesGetting());
      } else {
        setHasRefresh(true);
      }
    },
    [dispatch, hasRefresh, location],
    getPlaces
  );

  return (
    <css.Places>
      <div>
        {action !== 'new' && (
          <>
            <css.buttons>
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
                  d='M12 4.5v15m7.5-7.5h-15'
                />
              </svg>
              <nav>
                <Link
                  to={'/account/places/new'}
                  style={{
                    textDecoration: 'none',
                    color: 'goldenrod',
                    fontSize: '17px',
                  }}
                >
                  Add New Page
                </Link>
              </nav>
            </css.buttons>
            <css.yourPerks>
              {getPlaces !== null && (
                <css.yourPerksChildren>
                  {getPlaces.map((data, index) => (
                    <div key={index} className='yourPerksGrandChildren'>
                      <Link
                        to={`/account/places/${data._id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <div className='yourPerksImageTitle'>
                          <div>
                            <h1>{data.title}</h1>
                            <p>{data.address}</p>
                          </div>
                          {data.photos.length >= 0 && (
                            <img
                              src={data.photos[0] || data.photos[0]}
                              alt='your houses'
                            />
                          )}
                        </div>
                        <div className='yourPerksDescription'>
                          <h3 style={{ margin: '0' }}>{data.description}</h3>
                          <p>{data.extraInfo}</p>
                        </div>
                        <div>
                          {data.perks.length >= 0 && (
                            <ul>
                              {data.perks.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div>
                          <h2>{`$ ${data.price}USD`}</h2>
                        </div>
                      </Link>
                    </div>
                  ))}
                </css.yourPerksChildren>
              )}
            </css.yourPerks>
          </>
        )}
      </div>

      {action === 'new' && (
        <>
          <PlacesFormPage />
        </>
      )}
    </css.Places>
  );
};

export default PlacesPage;
