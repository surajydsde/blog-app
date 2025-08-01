import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login')
  }

  return (
 <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">My Blog Site</Link>

      {/* Hamburger menu toggle button for mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible navbar content */}
      <div className="collapse navbar-collapse" id="navbarContent">
        <div className="navbar-nav ms-auto">
          {user ? (
            <>
              <span className="nav-link text-white">Hi, {user.name.toUpperCase()}</span>
              <Link className="nav-link" to="/create">Create</Link>
              <button
                className="btn btn-outline-light btn-sm ms-lg-2 mt-2 mt-lg-0"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header