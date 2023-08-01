import React from 'react';
import css from '../Css/Centralize';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../axios/apiaxios';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: ' ',
    password: ' ',
  });
  const { userValue } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   console.log(userValue);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async () => {
    const response = await Promise.resolve(
      dispatch(
        loginUser({
          username: loginData.username,
          password: loginData.password,
        })
      )
    );
    if (response.payload) {
      navigate('/');
    }
  };

  return (
    <css.Container login>
      <css.Login>
        <div>
          <h1>Login</h1>
        </div>
        <div>
          <css.InputUsername
            type='text'
            name='username'
            onChange={handleChange}
            placeholder='Enter Username'
          ></css.InputUsername>
          <css.InputPassword
            type='password'
            name='password'
            onChange={handleChange}
            placeholder='Enter Password'
          ></css.InputPassword>
          <button onClick={handleSubmit}>Login</button>
          <span>
            Not A Member <a href='/register'>Register</a>
          </span>
        </div>
      </css.Login>
    </css.Container>
  );
};

export default Login;
