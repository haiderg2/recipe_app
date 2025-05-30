import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const RecipeDetail = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({ name: '', quantity: '', unit: '' });
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API || 'https://miamiarctic-sugarmineral-3000.codio-box.uk';
  const userId = JSON.parse(atob(token.split('.')[1])).id;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${API_URL}/recipes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipe(res.data);
      } catch (err) {
        setError('Failed to load recipe');
        console.error(err);
      }
    };

    const fetchIngredients = async () => {
      try {
        const res = await axios.get(`${API_URL}/recipes/${id}/ingredients`);
        setIngredients(res.data);
      } catch (err) {
        console.error('Failed to load ingredients', err);
      }
    };

    fetchRecipe();
    fetchIngredients();
  }, [id, token]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/recipes');
    } catch (err) {
      console.error('Failed to delete:', err);
      setError('Failed to delete recipe');
    }
  };

  const handleIngredientChange = (e) => {
    setNewIngredient({ ...newIngredient, [e.target.name]: e.target.value });
  };

  const handleAddIngredient = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/recipes/${id}/ingredients`, newIngredient, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewIngredient({ name: '', quantity: '', unit: '' });
      const res = await axios.get(`${API_URL}/recipes/${id}/ingredients`);
      setIngredients(res.data);
    } catch (err) {
      console.error('Failed to add ingredient:', err);
    }
  };

  if (!recipe) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  return (
    <>
      <Navbar />
      <div style={styles.pageWrapper}>
        <div style={styles.container}>
          <h2 style={styles.title}>{recipe.title}</h2>
          <p style={styles.description}>{recipe.description}</p>
          <p style={styles.meta}>⏱️ Prep: {recipe.prep_time} mins | Cook: {recipe.cook_time} mins</p>
          <p style={styles.instructions}>{recipe.instructions}</p>

          <h3 style={styles.subheading}>Ingredients</h3>
          <ul style={styles.ingredientList}>
            {ingredients.map((ing) => (
              <li key={ing.id}>
                {ing.quantity} {ing.unit} of {ing.name}
              </li>
            ))}
          </ul>

          {recipe.user_id === userId && (
            <form onSubmit={handleAddIngredient} style={styles.ingredientForm}>
              <input
                type="text"
                name="name"
                placeholder="Ingredient"
                value={newIngredient.name}
                onChange={handleIngredientChange}
                style={styles.input}
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Qty"
                value={newIngredient.quantity}
                onChange={handleIngredientChange}
                style={styles.input}
                required
              />
              <input
                type="text"
                name="unit"
                placeholder="Unit"
                value={newIngredient.unit}
                onChange={handleIngredientChange}
                style={styles.input}
                required
              />
              <button type="submit" style={styles.button}>Add</button>
            </form>
          )}

          {recipe.user_id === userId && (
            <div style={styles.actions}>
              <button onClick={() => navigate(`/recipes/${id}/edit`)} style={styles.editBtn}>Edit</button>
              <button onClick={handleDelete} style={styles.deleteBtn}>Delete</button>
            </div>
          )}

          {error && <p style={styles.error}>{error}</p>}
        </div>
      </div>
    </>
  );
};

const styles = {
  pageWrapper: {
    background: '#f0f2f5',
    minHeight: '100vh',
    padding: '60px 20px',
  },
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    background: '#ffffff',
    padding: '40px 35px',
    borderRadius: '12px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#333',
  },
  title: {
    fontSize: '32px',
    color: '#007bff',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  description: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#555',
    marginBottom: '15px',
    textAlign: 'center',
  },
  meta: {
    fontSize: '14px',
    color: '#777',
    marginBottom: '25px',
    textAlign: 'center',
  },
  instructions: {
    fontSize: '16px',
    lineHeight: '1.8',
    marginBottom: '30px',
    whiteSpace: 'pre-wrap',
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
  },
  subheading: {
    marginTop: '30px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  ingredientList: {
    paddingLeft: '20px',
    marginBottom: '20px',
  },
  ingredientForm: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    flex: '1 1 100px',
  },
  button: {
    padding: '10px 16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  editBtn: {
    padding: '10px 20px',
    background: '#ffc107',
    color: '#333',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  deleteBtn: {
    padding: '10px 20px',
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '20px',
  }
};

export default RecipeDetail;
