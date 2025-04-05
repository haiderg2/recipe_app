import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const EditRecipe = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    prep_time: '',
    cook_time: '',
    instructions: '',
  });

  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API || 'https://miamiarctic-sugarmineral-3000.codio-box.uk';

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${API_URL}/recipes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm(res.data);
      } catch (err) {
        setError('Failed to load recipe');
      }
    };

    fetchRecipe();
  }, [id, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.patch(`${API_URL}/recipes/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/recipes/${id}`);
    } catch (err) {
      console.error('Edit failed:', err);
      setError(err.response?.data?.error || 'Edit failed');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.heading}>Edit Recipe</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" style={styles.input} required />
            <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" style={styles.input} required />
            <input type="number" name="prep_time" value={form.prep_time} onChange={handleChange} placeholder="Prep Time" style={styles.input} required />
            <input type="number" name="cook_time" value={form.cook_time} onChange={handleChange} placeholder="Cook Time" style={styles.input} required />
            <textarea name="instructions" value={form.instructions} onChange={handleChange} placeholder="Instructions" style={styles.textarea} required />
            <button type="submit" style={styles.button}>Save Changes</button>
            {error && <p style={styles.error}>{error}</p>}
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
    maxWidth: '600px',
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
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '12px',
    fontSize: '16px',
    height: '100px',
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
  }
};

export default EditRecipe;
