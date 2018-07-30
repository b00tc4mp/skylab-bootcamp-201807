import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <main>
        <h1>Home Page</h1>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/myfavs">My Favourites</Link>
    </main>    
);

export default Home;