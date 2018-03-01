import React from 'react'
const LoginForm = ({ login, username, handleFormFieldChange, password }) => {

  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={login}>
        <div> Username
          <input 
            type="text" 
            name="username"
            value={username}
            onChange={handleFormFieldChange}
          />
        </div>
        <div> Password
          <input 
            type="password"
            name="password"
            value={password}
            onChange={handleFormFieldChange}
            />
        </div>
        <button type="submit">Kirjaudu</button>
      </form>
    </div>
  )
}

export default LoginForm