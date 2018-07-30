import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => (
    <section>
        <h1>Login</h1>
        <Link to="/register">Register</Link>
        <Link to="/">Home</Link>
    </section>
    
);

export default Login;

