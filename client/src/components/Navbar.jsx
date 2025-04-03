import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/recipes" style={styles.link}>🍽️ RecipeApp</Link>
      </div>
      <div style={styles.right}>
        <Link to="/recipes" style={styles.link}>Home</Link>
        {/* <Link to="/add" style={styles.link}>Add Recipe</Link> */}
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: '#007bff',
    color: '#fff',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  left: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  right: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '16px',
  },
  logout: {
    background: '#fff',
    color: '#007bff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }
};

export default Navbar;
