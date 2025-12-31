import React, { useState } from 'react';
import axios from 'axios';


const Shortener = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');

    const token = localStorage.getItem('token'); 

    if (!token) {
        window.location.href = '/login';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/url/shorten', 
                { longUrl },
                { headers: { 'x-auth-token': token } }
            );
            setShortUrl(res.data.shortUrl);
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div className="container">
            <h1>URL Shortener</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="url" 
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="Enter long URL"
                    required 
                />
                <button type="submit">Shorten</button>
            </form>
            
            {shortUrl && (
                <div className="result">
                    <p>Short URL:</p>
                    <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
                </div>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Shortener;