# Recipe Manager App (React + Koa + MySQL)

A full-stack recipe management web application that allows users to register, log in, create and manage recipes, and optionally add ingredients to each recipe.

## Features

- User Authentication – Register, login, logout using JWT  
- Recipe Management – Add, edit, delete your recipes  
- Ingredient Support – Add ingredients to recipes when creating or editing  
- Recipe Details – View full recipe with instructions and ingredients  
- Protected Routes – Only authors can edit or delete their own recipes  
- Testing – Mocha & Chai tests for API endpoints  
- Responsive UI – Clean interface built with custom CSS  

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/haiderg2/recipe_app.git
cd recipe-app
```

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env    # Configure DB credentials
npm run start           # or: node index.js
```

### 3. Frontend Setup

```bash
cd client
npm install
npm run start
```

### 4. Database Setup (MySQL)

Run the following SQL:

```sql
CREATE DATABASE recipe_db;
USE recipe_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  prep_time INT,
  cook_time INT,
  instructions TEXT,
  user_id INT
);

CREATE TABLE ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  quantity FLOAT,
  unit VARCHAR(50),
  recipe_id INT
);
```

## Running Tests

```bash
cd server
npm test
```

Tests cover:
- GET /recipes
- GET /recipes/:id

## Credits

Developed by Gulfam for the 6003CEM Individual Coursework.

## Contact

- GitHub: https://github.com/haiderg2/
- Email: haiderg2@coventry.ac.uk
