import {useEffect} from 'react';
import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';

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
      <h1 className="py-2 text-center">My app</h1>
      <div>
        <nav>
          <ul className="m-0 my-4 mb-4 flex list-none justify-end rounded-2xl border-1 border-sky-600 bg-sky-200 p-0 no-underline">
            <li>
              <Link
                className="block p-4 text-center transition-all duration-500 ease-in-out hover:bg-sky-300"
                to="/"
              >
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    className="block p-4 text-center transition-all duration-500 ease-in-out hover:bg-sky-300"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="block p-4 text-center transition-all duration-500 ease-in-out hover:bg-sky-300"
                    to="/upload"
                  >
                    Upload
                  </Link>
                </li>
                <li>
                  <Link
                    className="block rounded-tr-2xl rounded-br-2xl p-4 text-center transition-all duration-500 ease-in-out hover:bg-sky-300"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="block rounded-tr-2xl rounded-br-2xl p-4 text-center transition-all duration-500 ease-in-out hover:bg-sky-300"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
        <footer className="m-auto w-full bg-sky-400 p-4 text-center mt-4 rounded-sm">
          This is a footer
        </footer>
      </div>
    </>
  );
};

export default Layout;
