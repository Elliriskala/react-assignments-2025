import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import {RegisterCredentials} from '../types/LocalTypes';

const RegisterForm = () => {
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);
  const {postRegister, getUsernameAvailable, getEmailAvailable} = useUser();
  const initValues: RegisterCredentials = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async () => {
    try {
      const registerResult = await postRegister(inputs as RegisterCredentials);
      console.log('doRegister result', registerResult);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doRegister,
    initValues,
  );

  useEffect(() => {
    const main = async () => {
      try {
        if (inputs.username.length > 2) {
          const result = await getUsernameAvailable(inputs.username);
          setUsernameAvailable(result.available);
          console.log('username check', result.available);
        } else {
          setUsernameAvailable(true);
        }
      } catch (error) {
        console.error((error as Error).message);
        setUsernameAvailable(true);
      }
    };

    main();
  }, [inputs.username]);

  useEffect(() => {
    const main = async () => {
      try {
        if (inputs.email.length > 5) {
          const result = await getEmailAvailable(inputs.email);
          console.log('email check', result.available);
          setEmailAvailable(result.available);
        } else {
          setEmailAvailable(true);
        }
      } catch (error) {
        console.error((error as Error).message);
        setEmailAvailable(true);
      }
    };

    main();
  }, [inputs.email]);

  return (
    <>
      <h1 className="p-4 text-center">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center rounded-md bg-sky-200 p-2"
      >
        <div className="m-2 flex w-4/5 flex-col p-2">
          <label htmlFor="registerusername">Username</label>
          <input
            className="my-2.5 rounded-md border-1 p-2.5"
            name="username"
            type="text"
            id="registerusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
          {!usernameAvailable && (
            <p className="text-right text-red-500">Username not available</p>
          )}
        </div>
        <div className="flex w-4/5 flex-col p-2">
          <label htmlFor="registerpassword">Password</label>
          <input
            className="my-2.5 rounded-md border-1 p-2.5"
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <div className="flex w-4/5 flex-col p-2">
          <label htmlFor="registeremail">Email</label>
          <input
            className="my-2.5 rounded-md border-1 p-2.5"
            name="email"
            type="text"
            id="registeremail"
            onChange={handleInputChange}
            autoComplete="email"
          />
          {!emailAvailable && (
            <p className="text-right text-red-500">Email not available</p>
          )}
        </div>
        <button
          className="my-4 block w-2/5 rounded-2xl bg-sky-300 py-2.5 transition-all duration-500 ease-in-out hover:bg-sky-500"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
