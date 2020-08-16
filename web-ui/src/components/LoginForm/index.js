import React from "react";

const LoginForm = ({ handleFieldChange, handleSubmit, error }) => {
  return (
    <form method='POST' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='username'>Username:</label>
        <input
          type='email'
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
        />
      </div>
      {error && <p className='text-danger'>{error.message}</p>}
      <button type='submit' className='form-control btn btn-info mt-2'>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
