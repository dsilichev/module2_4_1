import styles from '../app.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';

const EMAILREGEX = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
const PASSWORDREGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const fieldScheme = yup.object()
.shape({
  email: yup.string()
  .matches(EMAILREGEX, 'Email должен содержать @'),
  password: yup.string()
  .matches(PASSWORDREGEX, 'Пароль от 8 символов, должен содержать прописную, заглавную букву и спецсимвол !@#$%^&*')
});

export const SignUpAdv = () => {
    const submitButtonRef = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          email: '',
          password: '',
          passwordVerify: '',
        },
        resolver: yupResolver(fieldScheme), // валидация с помощью yup
      });

      const emailError = errors.email?.message;
      const passwordError = errors.password?.message;
      const passwordVerifyError = '';

      const checkPasswordVerify = () => {
        
      }

      const onSubmit = (formData) => {
        console.log(formData);
      };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Введите данные:</h1>
        {emailError && <label className={styles.errorLabel}>{emailError}</label>}
        <input
          name="email"
          type="email"
          placeholder="Почта"
          {...register('email', /*loginProps*/)}
        />
        {passwordError && <label className={styles.errorLabel}>{passwordError}</label>}
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          {...register('password', /*loginProps*/)}
        />
        {passwordVerifyError && (
          <label className={styles.errorLabel}>{passwordVerifyError}</label>
        )}
        <input
          name="passwordVerify"
          type="password"
          placeholder="Повторите пароль"
          {...register('passwordVerify', /*loginProps*/)}
          onBlur={checkPasswordVerify}
        />
        <button
          className={styles.submitButton}
          ref={submitButtonRef}
          type="submit"
          disabled={false}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};
