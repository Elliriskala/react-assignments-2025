import {Link, Outlet} from 'react-router';

const Layout = () => {
  return (
    <>
      <h1>My app</h1>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
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
