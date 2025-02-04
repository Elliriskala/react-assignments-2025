import {useEffect} from 'react';
import {Link, Outlet} from 'react-router';
import { useUserContext } from '../hooks/contextHooks';


const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  useEffect(() => {
    if (!user) {
      try {
        handleAutoLogin();
      } catch (error) {
        console.log((error as Error).message);
      }
    }
  }, []);

  return (
    <>
      <h1>My app</h1>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/upload">Upload</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
        <footer>This is a footer</footer>
      </div>
    </>
  );
};

export default Layout;
