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
      {displayRegister ? (
        <RegisterForm />
      ) : (
        <LoginForm toggleRegister={toggleRegister} />
      )}
      <button
        className="my-6 block w-2/5 rounded-2xl bg-sky-200 py-2.5 transition-all duration-500 ease-in-out hover:bg-sky-300 m-auto"
        onClick={toggleRegister}
      >
        or {displayRegister ? 'login' : 'register'}?
      </button>
    </>
  );
};

export default Login;
