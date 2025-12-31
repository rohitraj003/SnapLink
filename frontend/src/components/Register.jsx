import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    const { name, email, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const body = JSON.stringify({ name, email, password });

            
            const res = await axios.post('http://localhost:5000/api/auth/register', body, config);

            
            localStorage.setItem('token', res.data.token);

           
            navigate('/dashboard'); 
            
        } catch (err) {
            
            const errorMsg = err.response?.data?.errors?.[0]?.msg || 'Registration failed';
            setError(errorMsg);
        }
    };

    return (
        <div className="auth-container">
            <h1>Sign Up</h1>
            <p>Create your account</p>
            
            {error && <div className="error-alert">{error}</div>}

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        value={name} 
                        onChange={onChange} 
                        required 
                    />
                </div>
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
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        name="confirmPassword" 
                        value={confirmPassword} 
                        onChange={onChange} 
                        minLength="6"
                    />
                </div>
                <button type="submit" className="btn-primary">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    );
};

export default Register;