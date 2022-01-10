import React, { useState } from 'react';

const UserSignupPage = ({ actions }) => {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [pendingApiCall, setPendingApiCall] = useState(false);

  const onChangeDisplayName = (event) => {
    const value = event.target.value;
    setDisplayName(value);
  };

  const onChangeUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const onChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const onChangePasswordRepeat = (event) => {
    const value = event.target.value;
    setPasswordRepeat(value);
  };

  const onSignup = () => {
    const user = {
      username,
      displayName,
      password,
    };

    setPendingApiCall(true);
    
    actions
      .postSignup(user)
      .then((_) => setPendingApiCall(false))
      .catch((_) => setPendingApiCall(false));
  };

  return (
    <div className="container">
      <h1 className="text-center">Sign Up</h1>
      <div className="col-12 mb-3">
        <label htmlFor="displayName">Display Name</label>
        <input
          className="form-control"
          name="displayName"
          type="text"
          placeholder="Your display name"
          value={displayName}
          onChange={onChangeDisplayName}
        />
      </div>
      <div className="col-12 mb-3">
        <label htmlFor="username">Username</label>
        <input
          className="form-control"
          name="username"
          type="text"
          placeholder="Your username"
          value={username}
          onChange={onChangeUsername}
        />
      </div>
      <div className="col-12 mb-3">
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          name="password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="col-12 mb-3">
        <label htmlFor="passwordRepeat">Password Repeat</label>
        <input
          className="form-control"
          name="passwordRepeat"
          type="password"
          placeholder="Repeat your password"
          value={passwordRepeat}
          onChange={onChangePasswordRepeat}
        />
      </div>
      <div className="text-center">
        <button
          onClick={onSignup}
          className="btn btn-primary"
          disabled={pendingApiCall}
        >
          {pendingApiCall && (
            <div
              className="spinner-border text-light spinner-border-sm mr-1"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          )}
          Sign Up
        </button>
      </div>
    </div>
  );
};

UserSignupPage.defaultProps = {
  actions: {
    postSignup: () => new Promise((resolve, _) => resolve({})),
  },
};

export default UserSignupPage;
