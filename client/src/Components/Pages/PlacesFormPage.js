import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import css from '../Css/Centralize';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, postPlaces, postPlacesUpdating } from '../axios/apiaxios';
import { useEffect } from 'react';

const PlacesFormPage = () => {
  const [image, setImage] = useState([]);
  const [device, setDevice] = useState();
  const [hasRefresh, setHasRefresh] = useState(false);
  const [formData, setFormData] = useState({
    perks: [],
    photos: [],
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((state) =>
    id ? state.user.getPlaces.find((p) => p._id === id) : null
  );
  // console.log(post);

  useEffect(() => {
    if (id && post) {
      setFormData(post);
    }
  }, [setFormData, post, id]);

  // console.log(formData);

  // console.log(image);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // console.log(name, value);
    if (type === 'checkbox') {
      // [...formData.perks] means of you create the form you don't need this array if you wanna to update the field at that time the ...spread operator clone your array value with new value.. it's big features.. you can use slice() method also whatever choices is yours.....
      let newCheckboxArray = [...formData.perks];
      if (checked) {
        newCheckboxArray.push(value);
      } else {
        newCheckboxArray.filter((v) => v !== value);
      }
      setFormData({ ...formData, perks: newCheckboxArray });
    } else if (name === 'photos') {
      let urlLinks = [...formData.photos];
      if (name === 'photos') {
        urlLinks.push(value);
      }
      setFormData({ ...formData, photos: urlLinks });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // console.log(formData);

  // console.log(formData.photos);

  const photoUpload = async (e) => {
    e.preventDefault();
    // YOU CAN USE THIS METHOD ALSO..........
    // const lastItem = formData.photos.slice(-1)[0];
    // setPhotoLink(lastItem);

    // for (const photolinks of formData.photos) {
    //   const { payload } = await dispatch(uploadImage(photolinks));
    //   // setImage((prev) => prev.concat(payload.link));
    //   setImage(image.concat(payload.link));
    // }
    const lastPhotoLink = formData.photos[formData.photos.length - 1];

    // you can use formdata.photos.slice(-1)[0]
    // slice means cut the last value create new array not modify original array.....[0] index
    const { payload } = await Promise.resolve(
      dispatch(uploadImage(lastPhotoLink))
    );
    // crate new array with all values.....
    setImage(image.concat(payload.link));
    // console.log(formData);
    // console.log(photolink);

    // formData.photos.forEach(async (photolinks) => {
    //   return setPhotoLink(photolinks);
    // });
    // const { payload } = await Promise.resolve(dispatch(uploadImage(photolink)));

    // // console.log(`${payload.link}`);
    // // BOTH ARE SAME YOU CAN CHOOSE WHATEVER THIS ALSO WORKING SAME PRINCEPLE THE ...SETIMAGE CREATE NEW ARRAY THE SPREAD OPERATOR GIVE PREVIOUS VALUE, AND SAVE NEW VALUE INTO THE NEW  ARRAY...... CONCAT ALSO WORKING SAME CREATE NEW ARRAY WITH PREVIOUS VALUE.....
    // //  setImage((prev) => {
    // //   return [...prev, payload.link];
    // // });
    // setImage(image.concat(payload.link));
  };

  const uploadDevice = async (e) => {
    const { name } = e.target;
    if (e.target.files && e.target.files[0]) {
      const urlLinks = formData.photos;
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      // console.log(reader);
      reader.onload = (event) => {
        urlLinks.push(event.target.result);
        setFormData({ ...formData, photos: urlLinks });
        filterOut(formData.photos);
      };
    }
  };

  const filterOut = (photo) => {
    const data = photo.filter((image) => {
      return image.startsWith('data');
    });
    setDevice(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // photoUpload(e);
    console.log(formData);
    if (id && post) {
      const response = await Promise.resolve(
        dispatch(postPlacesUpdating(formData))
      );
      if (response.payload) {
        navigate('/account/places');
      }
    } else {
      const response = await Promise.resolve(dispatch(postPlaces(formData)));
      if (response.payload) {
        navigate('/account/places');
      }
    }
  };

  return (
    <css.Places>
      <css.cssForms>
        <form>
          <input
            type='text'
            placeholder='Title'
            name='title'
            value={formData.title || ''}
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Address'
            name='address'
            value={formData.address || ''}
            onChange={handleChange}
          />

          <div className='photos_div'>
            <input
              className='photos_input'
              type='text'
              name='photos'
              onChange={handleChange}
              placeholder='Add Using A Link ...jpg'
            ></input>
            <button onClick={photoUpload} style={{ fontSize: 'initial' }}>
              Add
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {image.length >= 0 &&
              image.map((links) => (
                <div key={links} style={{ margin: '10px' }}>
                  <img
                    key={links}
                    className='image_upload_link'
                    src={device || `http://localhost:8000/uploads/${links}`}
                    alt='images'
                  ></img>
                </div>
              ))}
          </div>

          <label
            style={{
              width: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              border: '1px solid goldenrod',
              borderRadius: '10px',
            }}
          >
            <input
              type='file'
              name='photos'
              multiple
              style={{ display: 'none' }}
              onChange={uploadDevice}
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
              style={{ width: '28px', height: '28px', stroke: 'goldenrod' }}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z'
              />
            </svg>
            Upload From Device
          </label>

          {/* <button onClick={uploadDeviceCallback}>Upload</button> */}

          <textarea
            placeholder='Description'
            name='description'
            value={formData.description || ''}
            onChange={handleChange}
          />

          <h3 style={{ margin: '0px' }}>Perks</h3>
          <div className='checkboxPerks'>
            <label>
              <input
                type='checkbox'
                name='wifi'
                value='wifi'
                checked={formData.perks.includes('wifi') || false}
                onChange={handleChange}
              />
              <span>Wifi</span>
            </label>

            <label>
              <input
                type='checkbox'
                name='tv'
                value='tv'
                checked={formData.perks.includes('tv')}
                onChange={handleChange}
              />
              <span>Tv</span>
            </label>

            <label>
              <input
                type='checkbox'
                name='enjoy'
                checked={formData.perks.includes('enjoy')}
                value='enjoy'
                onChange={handleChange}
              />
              <span>Enjoy</span>
            </label>

            <label>
              <input
                type='checkbox'
                name='drink'
                value='drink'
                checked={formData.perks.includes('drink')}
                onChange={handleChange}
              />
              <span>Drink</span>
            </label>

            <label>
              <input
                type='checkbox'
                name='internet'
                value='internet'
                checked={formData.perks.includes('internet')}
                onChange={handleChange}
              />
              <span>Internet</span>
            </label>
          </div>

          <h4 style={{ margin: '0px' }}>Extra Information</h4>
          <textarea
            placeholder='Extra Information'
            name='extraInfo'
            value={formData.extraInfo || ''}
            onChange={handleChange}
          />

          <div>
            <span>
              Place Prize Per Night :
              <input type='number' name='price' onChange={handleChange} />
            </span>
          </div>

          <button onClick={handleSubmit}>Submit</button>
        </form>
      </css.cssForms>
    </css.Places>
  );
};

export default PlacesFormPage;

// const uploadDevice = async (e) => {
//   const fileses = e.target.files;

//   console.log(fileses);

//   const data = new FormData();

//   for (let i = 0; i < fileses.length; i++) {
//     data.append('photos', fileses[i]);
//   }
//   const { payload } = await Promise.resolve(dispatch(uploadDevices(data)));
//   console.log(payload);
//   setImage(image.concat(payload.link));
// };
