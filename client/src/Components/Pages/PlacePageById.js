import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import css from '../Css/Centralize';
import { useNavigate } from 'react-router';

const PlacePageById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //   const { getPlaces } = useSelector((state) => state.user);
  //   console.log(getPlaces);

  const post = useSelector((state) =>
    id ? state.user.getPlaces.find((p) => p._id === id) : null
  );

  useEffect(() => {
    if (!post) {
      navigate('/');
    }
  }, [post, navigate]);

  //   console.log(post);

  return (
    <css.PlacesPage>
      {post && (
        <article>
          <div className='homeItems'>
            <div className='homeLetters'>
              <h1
                className='homeTitle'
                style={{
                  color: 'goldenrod',
                  fontSize: '55px',
                  margin: '0px',
                  padding: '0px',
                  textAlign: 'center',
                }}
              >
                {post.title}🚀
              </h1>

              <div className='extraInfo'>
                <h3>
                  <span>
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
                        d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                      />
                    </svg>
                  </span>
                  {post.address.toUpperCase()}
                </h3>
                <h2>
                  <span>
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
                        d='M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3'
                      />
                    </svg>
                  </span>
                  {post.description.toUpperCase()}
                </h2>
                <p>
                  <span>
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
                        d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
                      />
                    </svg>
                  </span>
                  {post.extraInfo.toUpperCase()}
                </p>
                <h2>
                  <span>
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
                        d='M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </span>
                  {post.price.toUpperCase()} PerNight
                </h2>
              </div>
            </div>

            <div className='homeImage'>
              {post.photos.map((images, index) => (
                <img
                  key={index}
                  src={images}
                  alt='images'
                  //   style={{
                  //     height: index === 0 ? '800px' : 'initial',
                  //     width: '33.3%',
                  //     objectFit: 'cover',
                  //   }}
                />
              ))}
            </div>
          </div>
        </article>
      )}
    </css.PlacesPage>
  );
};

export default PlacePageById;
