import { useState, useRef } from 'react';
import styles from '../app.module.css';
import { useStore } from './useStore';

const EMAILREGEX = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
const PASSWORDREGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const validateField = (fieldName, field) => {
  //ручная проверка
  let error = '';
  switch (fieldName) {
    case 'email':
      if (!EMAILREGEX.test(field)) {
        error = 'Email должен содержать @';
      }
      break;
    case 'password':
      if (!PASSWORDREGEX.test(field)) {
        error =
          'Пароль от 8 символов, должен содержать прописную, заглавную букву и спецсимвол !@#$%^&*';
      }
      break;
    default:
      error = '';
  }

  return error;
};

export const SignUp = () => {
  const { getState, updateState } = useStore();
  const { email, password, passwordVerify } = getState();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVerifyError, setPasswordVerifyError] = useState('');

  const submitButtonRef = useRef(null);

  const checkEmail = (value) => {
    const error = validateField('email', value);
    setEmailError(error);
    if (!error) {
      checkFormComplete();
    }
  };

  const checkPassword = () => {
    setPasswordError(validateField('password', password));
    checkFormComplete();
  };

  const checkPasswordVerify = () => {
    if (passwordVerify !== password) {
      setPasswordVerifyError('Пароли не совпадают');
    } else {
      setPasswordVerifyError('');
    }
    checkFormComplete();
  };

  const checkFormComplete = () => {
    if (
      email &&
      password &&
      passwordVerify &&
      !emailError &&
      !passwordError &&
      !passwordVerifyError
    ) {
      submitButtonRef.current.focus();
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('Данные:', { email, password, passwordVerify });
  };

  return (
    <div>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1>Введите данные:</h1>
        {emailError && <label className={styles.errorLabel}>{emailError}</label>}
        <input
          name="email"
          type="email"
          placeholder="Почта"
          value={email}
          onChange={({ target }) => updateState('email', target.value)}
          onBlur={({ target }) => checkEmail(target.value)}
        />
        {passwordError && <label className={styles.errorLabel}>{passwordError}</label>}
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={({ target }) => updateState('password', target.value)}
          onBlur={checkPassword}
        />
        {passwordVerifyError && (
          <label className={styles.errorLabel}>{passwordVerifyError}</label>
        )}
        <input
          name="passwordVerify"
          type="password"
          placeholder="Повторите пароль"
          value={passwordVerify}
          onChange={({ target }) => updateState('passwordVerify', target.value)}
          onBlur={checkPasswordVerify}
        />
        <button
          className={styles.submitButton}
          ref={submitButtonRef}
          type="submit"
          disabled={emailError || passwordError || passwordVerifyError || !(email && password && passwordVerify)}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};
