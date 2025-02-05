import {useUserContext} from '../hooks/contextHooks';

const Profile = () => {
  const {user} = useUserContext();

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
