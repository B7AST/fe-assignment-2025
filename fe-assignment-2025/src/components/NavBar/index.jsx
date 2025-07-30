const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>My Application</h1>
      </div>
      <ul className="navbar-menu">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;