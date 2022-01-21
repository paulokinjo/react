import React, { useState } from 'react';
import Input from '../components/Input';
const UserSignupPage = ({ actions }) => {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [errors, setErrors] = useState({});

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
      .catch((apiError) => {
        const { data } = apiError.response;
        if (data && data.validationErrors) {
          setErrors({ ...data.validationErrors });
        }

        setPendingApiCall(false);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center">Sign Up</h1>
      <div className="col-12 mb-3">
        <Input
          label="Display Name"
          placeholder="Your display name"
          value={displayName}
          onChange={onChangeDisplayName}
          hasError={errors.displayName && true}
          error={errors.displayName}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          label="Username"
          placeholder="Your username"
          value={username}
          onChange={onChangeUsername}
          hasError={errors.username && true}
          error={errors.username}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          label="Password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={onChangePassword}
          hasError={errors.password && true}
          error={errors.password}
        />
      </div>
      <div className="col-12 mb-3">
        <Input
          label="Password Repeat"
          type="password"
          placeholder="Repeat your password"
          value={passwordRepeat}
          onChange={onChangePasswordRepeat}
          hasError={errors.passwordRepeat && true}
          error={errors.passwordRepeat}
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
