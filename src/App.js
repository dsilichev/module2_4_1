import styles from './app.module.css';
import { SelectComponent } from './components/SelectComponent';
import { SignUp } from './components/SignUp';
import { UseFormComponent } from './components/UseFormComponent';
import { UseRefComponent } from './components/UseRefComponent';
import { SignUpAdv } from './components/SignUpAdv.jsx';

export const App = () => {
  return (
    <div className={styles.App}>
      <SignUp />
      {/* <SignUpAdv /> */}
    </div>
  );
};
