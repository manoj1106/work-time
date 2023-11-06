'use client';
import 'reflect-metadata';
import { SignInOptions, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormFeedback,
  CInputGroup,
  CRow,
  CFormLabel,
} from '@coreui/react';
import { useInput } from '@/_helpers/hooks/useInput';
import { ICredentials } from '../types/credentials.type';
import { container } from 'tsyringe';
import { SignInValidator } from '@/_helpers/validation/signin.validator';

const signInInputs: ICredentials = {
  username: '',
  password: '',
};

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const { inputs, handleInputChange, errors, setErrors } =
    useInput(signInInputs);
  const signInValidator = container.resolve(SignInValidator);

  const handleLogin = async (e: React.FormEvent) => {
    setError('');
    e.preventDefault();
    if (signInValidator.validateSignInInputs(inputs, setErrors)) {
      const credentials: SignInOptions = {
        username: inputs.username,
        password: inputs.password,
        redirect: false,
      };

      const res = await signIn('credentials', credentials);
      if (res && res.error) {
        setError(res.error);
      } else {
        setError('');
      }
      if (res?.ok && res?.status === 200) {
        router.push('/dashboard');
      }
    }
  };

  return (
    <div className='bg-primary min-vh-100 d-flex flex-row align-items-center'>
      <CContainer>
        <CRow className='justify-content-center'>
          <CCol md={9} lg={6}>
            <CCard className='p-4  bg-primary-dark'>
              <CCardBody>
                <CForm onSubmit={handleLogin} noValidate>
                  <p className='text-light text-align-center'>
                    Sign In to your account
                  </p>
                  <CFormLabel htmlFor='username' className='text-light'>
                    Username
                  </CFormLabel>
                  <CInputGroup className='mb-3 has-validation'>
                    <CFormInput
                      id='username'
                      type='email'
                      placeholder='Email'
                      autoComplete='username'
                      name='username'
                      value={inputs.username}
                      onChange={handleInputChange}
                      required
                      {...(errors.username && { invalid: true })}
                    />
                    {errors.username && (
                      <CFormFeedback invalid>{errors.username}</CFormFeedback>
                    )}
                  </CInputGroup>
                  <CFormLabel htmlFor='password' className='text-light'>
                    Password
                  </CFormLabel>
                  <CInputGroup className='mb-4 has-validation'>
                    <CFormInput
                      id='password'
                      type='password'
                      placeholder='Password'
                      autoComplete='current-password'
                      name='password'
                      value={inputs.password}
                      onChange={handleInputChange}
                      required
                      {...(errors.password && { invalid: true })}
                    />
                    {errors.password && (
                      <CFormFeedback invalid>{errors.password}</CFormFeedback>
                    )}
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton color='light' className='px-4' type='submit'>
                        Login
                      </CButton>
                    </CCol>
                  </CRow>
                  {error && (
                    <div className='mt-4'>
                      <p className='text-error text-medium-emphasis'>{error}</p>
                    </div>
                  )}
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default LoginPage;
