import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const AddRecipe = () => {
  const { token } = useContext(AuthContext);
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post(`${API_URL}/recipes`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate('/recipes');
    } catch (err) {
      console.error('Failed to add recipe:', err);
      setError(err.response?.data?.error || 'Failed to add recipe');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add a New Recipe</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required style={styles.input} />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required style={styles.input} />
        <input type="number" name="prep_time" placeholder="Prep Time (minutes)" value={form.prep_time} onChange={handleChange} required style={styles.input} />
        <input type="number" name="cook_time" placeholder="Cook Time (minutes)" value={form.cook_time} onChange={handleChange} required style={styles.input} />
        <textarea name="instructions" placeholder="Instructions" value={form.instructions} onChange={handleChange} required style={styles.textarea} />
        <button type="submit" style={styles.button}>Add Recipe</button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    background: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
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

export default AddRecipe;
