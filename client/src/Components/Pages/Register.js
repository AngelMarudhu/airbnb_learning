import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import css from '../Css/Centralize';
import { useDispatch, useSelector } from 'react-redux';
import { postUserDetails } from '../axios/apiaxios';

const Register = () => {
  const [register, setRegister] = useState({
    username: '',
    email: ' ',
    password: '',
  });
  const { userValue } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(userValue);

  //   useEffect(() => {
  //     console.log('Component mounted');
  //   }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    // console.log(name, value, 'handlechange register');
    setRegister({ ...register, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(register);
    const response = await Promise.resolve(dispatch(postUserDetails(register)));
    console.log(response);
    console.log(userValue);
    if (response.payload) {
      navigate('/login');
    }
  };

  return (
    <css.Container login>
      <css.Login>
        <div>
          <h1>Register</h1>
        </div>
        <div>
          <css.InputUsername
            type='text'
            name='username'
            onChange={handleChange}
            placeholder='Enter User Name'
          ></css.InputUsername>
          <css.InputEmail
            type='email'
            name='email'
            onChange={handleChange}
            placeholder='Enter Your Email'
          ></css.InputEmail>
          <css.InputPassword
            type='password'
            name='password'
            onChange={handleChange}
            placeholder='Enter Password'
          ></css.InputPassword>
          <button onClick={handleSubmit}>SignUp</button>
          <span>
            Already A Member <a href='/login'>Login</a>
          </span>
        </div>
      </css.Login>
    </css.Container>
  );
};

export default Register;
