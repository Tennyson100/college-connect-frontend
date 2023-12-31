import React, { useState, useEffect } from 'react';
import AuthVerify from '../helper/JWTVerify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Profile() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login");
    }

    useEffect(() => {
        setLoading(true);
        if (!AuthVerify(token)) navigate('/login');
        axios.get(`https://college-connect-backend-0x0i.onrender.com/user/view`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => setUser(res.data))
            .catch((err) => console.error(err));
    }, [])

    return (
        <>
            <h1>Logged In</h1>
            <button onClick={handleLogout}>Logout</button>
            {!user['user'] ? <h1>Loading</h1> : <></>}
            {user['user'] ?
                <>
                    <div>
                        {user['user']['name']}
                    </div>
                </>
                : <></>

            }
        </>
    )
}