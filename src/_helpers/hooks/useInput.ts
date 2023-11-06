// @ts-nocheck

import { useState } from 'react';
import { StringUtils } from '../utils/string.utils';

export const useInput = (initialInputs: any = {}) => {
  const initialErrors: any = {};
  const [inputs, setInputs] = useState(initialInputs);
  const [errors, setErrors] = useState(initialErrors);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const required = e.target.attributes.getNamedItem('required');
    const placeholder = e.target.attributes.getNamedItem('placeholder').value;
    // value is required
    if (required) {
      let error = '';
      if (typeof value === 'string' && StringUtils.isBlank(value)) {
        error = `${placeholder ? placeholder : name} is required`;
      }
      setErrors((currErrors) => {
        return {
          ...currErrors,
          [name]: error,
        };
      });
    }
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [name]: value,
      };
    });
  };

  const handleResetInput = (initialInputs: any = {}) => {
    setInputs(initialInputs);
    setErrors({});
  };

  return {
    inputs,
    errors,
    setInputs,
    setErrors,
    handleInputChange,
    handleResetInput,
  };
};
