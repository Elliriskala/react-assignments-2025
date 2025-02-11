import useForm from '../hooks/formHooks';
import {Credentials} from '../types/LocalTypes';
import {useUserContext} from '../hooks/contextHooks';

const LoginForm = (props: {toggleRegister: () => void}) => {
  const {toggleRegister} = props;
  const {handleLogin} = useUserContext();
  const initValues: Credentials = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      handleLogin(inputs as Credentials);
    } catch (error) {
      console.error((error as Error).message);
      // Display error to user here(?)
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doLogin,
    initValues,
  );

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginusername">Username</label>
          <input
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
            // value={inputs.username}
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            // value={inputs.password}
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={toggleRegister}>
          Register</button>
      </form>
    </>
  );
};

export default LoginForm;
