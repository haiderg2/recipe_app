import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const RecipeList = () => {
  const { token } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API || 'https://miamiarctic-sugarmineral-3000.codio-box.uk';

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${API_URL}/recipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecipes(res.data);
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
        setError('Failed to load recipes');
      }
    };

    fetchRecipes();
  }, [token]);

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <h2 style={styles.heading}>All Recipes</h2>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.grid}>
          {recipes.length === 0 ? (
            <p>No recipes found.</p>
          ) : (
            recipes.map(recipe => (
              <Link
                to={`/recipes/${recipe.id}`}
                key={recipe.id}
                style={{ textDecoration: 'none' }}
              >
                <div style={styles.card}>
                  <h3 style={styles.title}>{recipe.title}</h3>
                  <p style={styles.description}>{recipe.description}</p>
                  <p style={styles.time}>
                    ⏱️ Prep: {recipe.prep_time} mins | Cook: {recipe.cook_time} mins
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  page: {
    padding: '50px 30px',
    background: '#f0f2f5',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '32px',
    color: '#222',
    fontWeight: 'bold',
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    background: '#ffffff',
    padding: '25px 20px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.2s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  title: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#007bff',
    marginBottom: '12px',
  },
  description: {
    fontSize: '16px',
    color: '#444',
    marginBottom: '16px',
    lineHeight: '1.5',
  },
  time: {
    fontSize: '14px',
    color: '#666',
  },
};

export default RecipeList;
