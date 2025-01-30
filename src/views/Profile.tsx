import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';
import {UserWithNoPassword} from 'hybrid-types/DBTypes';

const Profile = () => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const {getUserByToken} = useUser();

  const getUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const userResponse = await getUserByToken(token);
      if (userResponse) {
        setUser(userResponse.user);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <h2>Profile</h2>
      {user && (
        <>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>{user.level_name}</p>
          <p>{new Date(user.created_at).toLocaleString('fi-FI')}</p>
        </>
      )}
    </>
  );
};

export default Profile;
