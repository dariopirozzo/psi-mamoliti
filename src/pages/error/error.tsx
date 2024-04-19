import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error: React.FC = () => {
    const navigate = useNavigate()
    const handleHome = () => {
        navigate('/')
    }

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f5f0fa' }}>
            <div className="text-center p-5 rounded-lg shadow-lg" style={{ backgroundColor: 'white', borderRadius: '20px' }}>
                <h1>Bienvenidos</h1>
                <p>¡Te quivocaste de Url!</p>
                <button className="btn btn-primary rounded-pill px-4" onClick={handleHome} style={{ backgroundColor: '#563d7c' }}>Ir a Home</button>
            </div>
        </div>
    );
};

export default Error;