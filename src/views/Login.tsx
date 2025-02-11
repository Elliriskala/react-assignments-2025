import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [displayRegister, setDisplayRegister] = useState(false);

  const toggleRegister = () => {
    setDisplayRegister(!displayRegister);
  };

  return (
    <>
      {displayRegister ? <RegisterForm /> : <LoginForm toggleRegister={toggleRegister} />}
      <button onClick={toggleRegister}>
        or {displayRegister ? 'login' : 'register'}?
      </button>
    </>
  );
};

export default Login;
