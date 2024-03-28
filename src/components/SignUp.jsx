import styles from './app.module.css';
import { useStore } from './useStore';

export const SignUp = () => {
  const {getState, updateState} = useStore();
  const { email, password, passwordVerify } = getState();

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Почта"
          value={email}
          onChange={({ target }) => updateState('email'. target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={({ target }) => updateState('password'. target.value)}
        />
        <input
          name="passwordVerify"
          type="password"
          placeholder="Повторите пароль"
          value={passwordVerify}
          onChange={({ target }) => updateState('passwordVerify'. target.value)}
        />
      </form>
    </div>
  );
};
