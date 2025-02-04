import { useEffect } from 'react';
import { useUserContext } from '../hooks/contextHooks';

const Logout = () => {

  const {handleLogout} = useUserContext();

  useEffect(() => {
    handleLogout();
  }, []);

  return <div>
    <button>Logout</button>
  </div>;
};

export default Logout;
