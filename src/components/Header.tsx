import { NavLink } from 'react-router';

const Header = () => (
  <header>
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/history">History</NavLink>
    </nav>
  </header>
);

export default Header;
