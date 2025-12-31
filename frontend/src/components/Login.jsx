import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const body = JSON.stringify({ email, password });

            const res = await axios.post('http://localhost:5000/api/auth/login', body, config);

            
            localStorage.setItem('token', res.data.token);

            
            navigate('/dashboard');

        } catch (err) {
            const errorMsg = err.response?.data?.errors?.[0]?.msg || 'Login failed';
            setError(errorMsg);
        }
    };

    return (
        <div className="auth-container">
            <h1>Sign In</h1>
            <p>Sign into your account</p>

            {error && <div className="error-alert">{error}</div>}

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        value={email} 
                        onChange={onChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        value={password} 
                        onChange={onChange} 
                        required
                    />
                </div>
                <button type="submit" className="btn-primary">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;