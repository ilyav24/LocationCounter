import React from "react";
import logo from "../../assets/img/brand/LOGO.png";
const LoginForm = ({ handleFieldChange, handleSubmit, error }) => {
  const errorStyle = { color: "#F04747" };
  return (
    <>
      <img src={logo} style={{
        display: 'block',
        margin: 'auto'
      }} />
      <form method='POST' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='Username'
            className='form-control'
            onChange={handleFieldChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            className='form-control'
            onChange={handleFieldChange}
            required
            minLength='8'
          />
        </div>
        {error && <span style={errorStyle}>{error.message}</span>}
        <button type='submit' className='form-control btn btn-info mt-2'>
          Login
      </button>
      </form>
    </>
  );
};

export default LoginForm;
