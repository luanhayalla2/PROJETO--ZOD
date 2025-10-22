import React from 'react';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  icon: Icon,
  hasError,
  isSubmetido,
}) => {
  const showValidationIcon = isSubmetido && value.length > 0;

  return (
    <div className="relative group">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors duration-300" />}
      <input
        type={type}
        id={id}
        aria-invalid={hasError}
        value={value}
        onChange={onChange}
        className={`peer block w-full pl-12 pr-10 py-4 bg-dark-800/50 border rounded-xl shadow-dark-light text-white transition-all duration-300 backdrop-blur-sm animate-fade-in
          ${hasError ? 'border-red-500/60' : 'border-dark-600/50'}
          focus:outline-none focus:ring-2 focus:ring-purple-500/80 focus:border-purple-500
          placeholder-transparent hover:bg-dark-700/50`}
        placeholder={label}
      />
      <label
        htmlFor={id}
        className="absolute left-12 -top-2.5 text-sm text-gray-500 transition-all duration-300 pointer-events-none
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base
          peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-400"
      >
        {label}
      </label>
      {showValidationIcon && (hasError ? <FaExclamationCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400 animate-pulse" /> : <FaCheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400" />)}
    </div>
  );
};

export default InputField;