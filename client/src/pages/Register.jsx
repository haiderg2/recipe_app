import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API || 'https://miamiarctic-sugarmineral-3000.codio-box.uk';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post(`${API_URL}/auth/register`, form);
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.heading}>Create an Account</h2>
          <form onSubmit={handleRegister} style={styles.form}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Sign Up</button>
            {error && <p style={styles.error}>{error}</p>}
            <p style={styles.link}>Already have an account? <Link to="/">Login</Link></p>
          </form>
        </div>
      </div>
    </>
  );
};

const styles = {
  page: {
    background: '#f0f2f5',
    minHeight: '100vh',
    padding: '50px 0',
  },
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    background: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '24px',
    color: '#007bff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  link: {
    textAlign: 'center',
    fontSize: '14px',
  },
};

export default Register;
