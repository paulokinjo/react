import React from 'react';
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import UserSignupPage from './UserSignupPage';

const setup = (actions) => {
  if (actions?.hasOwnProperty('postSignup')) {
    render(<UserSignupPage actions={actions} />);
  } else {
    render(<UserSignupPage />);
  }
};

const displayNameInputPlaceholderText = 'Your display name';
const usernameInputPlaceholderText = 'Your username';
const passwordInputPlaceholderText = 'Your password';
const passwordRepeatInputPlaceholderText = 'Repeat your password';

let button, displayNameInput, usernameInput, passwordInput, passwordRepeatInput;

beforeEach(cleanup);

describe('UserSignupPage', () => {
  describe('Layout', () => {
    it('has header of Sign Up', () => {
      setup();
      const header = screen.getByRole('heading', { level: 1 });
      expect(header).toHaveTextContent(/Sign Up/i);
    });

    it('has input for display name', () => {
      setup();
      displayNameInput = screen.getByPlaceholderText(
        displayNameInputPlaceholderText,
      );
      expect(displayNameInput).toBeInTheDocument();
    });

    it('has input for username', () => {
      setup();
      usernameInput = screen.getByPlaceholderText(usernameInputPlaceholderText);
      expect(usernameInput).toBeInTheDocument();
    });

    it('has input for password', () => {
      setup();
      passwordInput = screen.getByPlaceholderText(passwordInputPlaceholderText);
      expect(passwordInput).toBeInTheDocument();
    });

    it('has password type for password input', () => {
      setup();
      passwordInput = screen.getByPlaceholderText(passwordInputPlaceholderText);
      expect(passwordInput.type).toBe('password');
    });

    it('has input for password repeat', () => {
      setup();
      passwordRepeatInput = screen.getByPlaceholderText(
        passwordRepeatInputPlaceholderText,
      );
      expect(passwordRepeatInput).toBeInTheDocument();
    });

    it('has password type for passwordRepeat input', () => {
      setup();
      const passwordRepeat = screen.getByPlaceholderText(
        passwordRepeatInputPlaceholderText,
      );
      expect(passwordRepeat.type).toBe('password');
    });

    it('has submit button', () => {
      setup();
      const button = screen.queryByRole('button', { name: 'Sign Up' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    const mockAsyncDelayed = () =>
      jest.fn().mockImplementation(
        () =>
          new Promise((resolve, _) => {
            setTimeout(() => {
              resolve({});
            }, 300);
          }),
      );

    const changeEvent = (value) => {
      return { target: { value } };
    };

    const setupForSubmit = (props) => {
      setup({ ...props });
      displayNameInput = screen.queryByPlaceholderText(
        displayNameInputPlaceholderText,
      );
      usernameInput = screen.queryByPlaceholderText(
        usernameInputPlaceholderText,
      );
      passwordInput = screen.queryByPlaceholderText(
        passwordInputPlaceholderText,
      );
      passwordRepeatInput = screen.queryByPlaceholderText(
        passwordRepeatInputPlaceholderText,
      );
      fireEvent.change(displayNameInput, changeEvent('my-display-name'));
      fireEvent.change(usernameInput, changeEvent('my-username'));
      fireEvent.change(passwordInput, changeEvent('P4ssw0rd'));
      fireEvent.change(passwordRepeatInput, changeEvent('P4ssw0rd'));

      button = screen.queryByRole('button', { name: 'Sign Up' });
    };

    it('sets the displayName value into state', () => {
      setup();
      const displayNameInput = screen.getByPlaceholderText(
        displayNameInputPlaceholderText,
      );
      const expectedValue = 'my-display-name';

      fireEvent.change(displayNameInput, changeEvent(expectedValue));

      expect(displayNameInput).toHaveValue(expectedValue);
    });

    it('sets the username value into state', () => {
      setup();
      const usernameInput = screen.getByPlaceholderText(
        usernameInputPlaceholderText,
      );
      const expectedValue = 'my-username';

      fireEvent.change(usernameInput, changeEvent(expectedValue));

      expect(usernameInput).toHaveValue(expectedValue);
    });

    it('sets the password value into state', () => {
      setup();
      const passwordInput = screen.getByPlaceholderText(
        passwordInputPlaceholderText,
      );
      const expectedValue = 'P4ssw0rd';

      fireEvent.change(passwordInput, changeEvent(expectedValue));

      expect(passwordInput).toHaveValue(expectedValue);
    });

    it('sets the passwordRepeat value into state', () => {
      setup();
      const passwordRepeatInput = screen.getByPlaceholderText(
        passwordRepeatInputPlaceholderText,
      );
      const expectedValue = 'P4ssw0rd';

      fireEvent.change(passwordRepeatInput, changeEvent(expectedValue));

      expect(passwordRepeatInput).toHaveValue(expectedValue);
    });

    it('calls postSignup when the fields are valid and the actions are provided in props', () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({}),
      };
      setupForSubmit(actions);

      fireEvent.click(button);

      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });

    it('does not throw exception when clicking the button when actions not provided in props', () => {
      setupForSubmit();
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('calls post with user body when the fields are valid', () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({}),
      };
      setupForSubmit(actions);

      fireEvent.click(button);
      const expectedUser = {
        username: 'my-username',
        displayName: 'my-display-name',
        password: 'P4ssw0rd',
      };

      expect(actions.postSignup).toHaveBeenCalledWith(expectedUser);
    });

    it('does not allow user to click the Sign Up button when there is a ongoing api call', () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };

      setupForSubmit(actions);

      fireEvent.click(button);
      fireEvent.click(button);

      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });

    it('displays spinner when there is an ongoing api call', () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };

      setupForSubmit(actions);
      fireEvent.click(button);

      const spinner = screen.queryByText('Loading...');
      expect(spinner).toBeInTheDocument();
    });

    it('hides spinner after api call finishes successfully', async () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };

      setupForSubmit(actions);
      fireEvent.click(button);

      const spinner = screen.queryByText('Loading...');
      await waitFor(() => expect(spinner).not.toBeInTheDocument());
    });

    it('hides spinner after api call finishes with error', async () => {
      const actions = {
        postSignup: jest.fn().mockImplementation(
          () =>
            new Promise((_, reject) => {
              setTimeout(() => {
                reject({
                  response: { data: {} },
                });
              }, 300);
            }),
        ),
      };

      setupForSubmit(actions);
      fireEvent.click(button);

      const spinner = screen.queryByText('Loading...');
      await waitFor(() => expect(spinner).not.toBeInTheDocument());
    });
  });
});

console.error = () => {};
