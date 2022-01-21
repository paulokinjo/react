import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Input from './Input';

const setup = (props) => render(<Input {...props} />);

describe('Layout', () => {
  it('has input item', () => {
    setup();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('displays the label provided in props', () => {
    setup({ label: 'Test label' });
    const label = screen.queryByText('Test label');
    expect(label).toBeInTheDocument();
  });

  it('does not displays the label when no label provided in props', () => {
    setup();
    let expectedMessage = '';
    try {
      screen.getByRole('none');
    } catch (error) {
      expectedMessage = error.message;
    } finally {
      expect(expectedMessage).toContain(
        'Unable to find an accessible element with the role "none"',
      );
    }
  });

  it('has text type for input when type is not provided as prop', () => {
    setup();
    const input = screen.getByRole('textbox');
    expect(input.type).toBe('text');
  });

  it('has password type for input when password type is provided as prop', () => {
    setup({ type: 'password' });
    const input = screen.getByRole('textbox');
    expect(input.type).toBe('password');
  });

  it('displays placeholder when it is provided as prop', () => {
    setup({ placeholder: 'Test placeholder' });
    const input = screen.getByRole('textbox');
    expect(input.placeholder).toBe('Test placeholder');
  });

  it('has value for input when it is provided as prop', () => {
    setup({ value: 'Test value' });
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('Test value');
  });

  it('has onChange callback when it is provided as prop', () => {
    const onChange = jest.fn();
    setup({ onChange });
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new-input' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('has default style when there is no validation error or success', () => {
    setup();
    const input = screen.getByRole('textbox');
    expect(input.className).toBe('form-control');
  });

  it('has success style when hasError property is false', () => {
    setup({ hasError: false });
    const input = screen.getByRole('textbox');
    expect(input.className).toBe('form-control is-valid');
  });

  it('has style for error case when there is error', () => {
    setup({ hasError: true });
    const input = screen.getByRole('textbox');
    expect(input.className).toBe('form-control is-invalid');
  });

  it('displays the error text when it is provided', () => {
    setup({ hasError: true, error: 'Cannot be null' });

    expect(screen.queryByText('Cannot be null')).toBeInTheDocument();
  });

  it('does not displays the error text when hasError not provided', () => {
    setup({ error: 'Cannot be null' });

    expect(screen.queryByText('Cannot be null')).not.toBeInTheDocument();
  });
});
