import React from 'react';

const Input = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  hasError,
  error,
}) => {
  let inputClassName = 'form-control'.concat(
    hasError === false ? ' is-valid' : hasError === true ? ' is-invalid' : '',
  );

  return (
    <div>
      {label && (
        <label htmlFor="" role="none">
          {label}
        </label>
      )}
      <input
        type={type || 'text'}
        role="textbox"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClassName}
      />
      {hasError && <span className="invalid-feedback">{error}</span>}
    </div>
  );
};

Input.defaultProps = {
  onChange: () => {},
};

export default Input;
