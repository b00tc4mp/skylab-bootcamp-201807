import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => (
    <section>
        <h1> Register </h1>
        <Link to="/login">Login</Link>
        <Link to="/">Home</Link> 
    </section>

);

export default Register;