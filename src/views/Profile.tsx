import {useUserContext} from '../hooks/contextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <section className="rounded-md bg-sky-200 p-4 w-3/5 m-auto mb-10">
      <h1 className="text-center font-bold my-4">Profile</h1>
      {user && (
        <>
          <p className="p-4 text-center border-b-1 border-sky-700">Username: {user.username}</p>
          <p className="p-4 text-center border-b-1 border-sky-700">Email: {user.email}</p>
          <p className="p-4 text-center border-b-1 border-sky-700">User level: {user.level_name}</p>
          <p className="p-4 text-center border-b-1 border-sky-700">
            Created at: {new Date(user.created_at).toLocaleString('fi-FI')}
          </p>
        </>
      )}
    </section>
  );
};

export default Profile;
