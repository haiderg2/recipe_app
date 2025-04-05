import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Navbar from '../components/Navbar';

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

  const [ingredient, setIngredient] = useState({ name: '', quantity: '', unit: '' });
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API || 'https://miamiarctic-sugarmineral-3000.codio-box.uk';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (e) => {
    setIngredient({ ...ingredient, [e.target.name]: e.target.value });
  };

  const addIngredient = (e) => {
    e.preventDefault();
    if (ingredient.name && ingredient.quantity && ingredient.unit) {
      setIngredients([...ingredients, ingredient]);
      setIngredient({ name: '', quantity: '', unit: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${API_URL}/recipes`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const recipeId = res.data.id;

      // post all ingredients if any
      for (const ing of ingredients) {
        await axios.post(`${API_URL}/recipes/${recipeId}/ingredients`, ing, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      navigate('/recipes');
    } catch (err) {
      console.error('Failed to add recipe:', err);
      setError(err.response?.data?.error || 'Failed to add recipe');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.heading}>Add a New Recipe</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} style={styles.input} required />
            <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} style={styles.input} required />
            <input type="number" name="prep_time" placeholder="Prep Time (minutes)" value={form.prep_time} onChange={handleChange} style={styles.input} required />
            <input type="number" name="cook_time" placeholder="Cook Time (minutes)" value={form.cook_time} onChange={handleChange} style={styles.input} required />
            <textarea name="instructions" placeholder="Instructions" value={form.instructions} onChange={handleChange} style={styles.textarea} required />

            <h4 style={styles.subheading}>Optional Ingredients</h4>
            <div style={styles.ingredientForm}>
              <input type="text" name="name" placeholder="Ingredient" value={ingredient.name} onChange={handleIngredientChange} style={styles.input} />
              <input type="number" name="quantity" placeholder="Qty" value={ingredient.quantity} onChange={handleIngredientChange} style={styles.input} />
              <input type="text" name="unit" placeholder="Unit" value={ingredient.unit} onChange={handleIngredientChange} style={styles.input} />
              <button onClick={addIngredient} style={styles.addBtn}>➕</button>
            </div>

            {ingredients.length > 0 && (
              <ul style={styles.ingredientList}>
                {ingredients.map((ing, index) => (
                  <li key={index}>{ing.quantity} {ing.unit} of {ing.name}</li>
                ))}
              </ul>
            )}

            <button type="submit" style={styles.button}>Add Recipe</button>
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
  subheading: {
    fontSize: '18px',
    marginTop: '30px',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    fontSize: '14px',
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
  },
  ingredientForm: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  ingredientList: {
    paddingLeft: '20px',
    marginBottom: '10px',
    color: '#333',
  },
  addBtn: {
    background: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default AddRecipe;
