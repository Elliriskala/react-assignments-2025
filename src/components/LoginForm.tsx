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
      <h1 className="p-4 text-center">Login</h1>
      <form className="flex flex-col items-center justify-center rounded-md bg-sky-200 p-2"onSubmit={handleSubmit}>
        <div className="m-2 flex w-4/5 flex-col p-2">
          <label htmlFor="loginusername">
            Username
          </label>
          <input
            className="my-2.5 rounded-md border-1 p-2.5"
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
            // value={inputs.username}
          />
        </div>
        <div className="flex w-4/5 flex-col p-2">
          <label className="px-2" htmlFor="loginpassword">
            Password
          </label>
          <input
            className="my-2.5 rounded-md border-1 p-2.5"
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            // value={inputs.password}
          />
        </div>
        <button
          className="my-4 block w-2/5 rounded-2xl bg-sky-300 py-2.5 transition-all duration-500 ease-in-out hover:bg-sky-500"
          type="submit"
        >
          Login
        </button>
        <button type="button" onClick={toggleRegister}></button>
      </form>
    </>
  );
};

export default LoginForm;
