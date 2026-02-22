import React from 'react';

const CircuitBreaker = () => {
    const [status, setStatus] = React.useState('CLOSED');
    const [failureCount, setFailureCount] = React.useState(0);

    const handleRequest = async () => {
        if (status === 'OPEN') {
            throw new Error('Circuit is open!');
        }

        try {
            const response = await fetch('https://api.example.com/data'); // Replace with your API
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Process the response here
            setStatus('CLOSED');
            setFailureCount(0);
        } catch (error) {
            setFailureCount(prev => prev + 1);
            if (failureCount >= 2) {
                setStatus('OPEN');
                setTimeout(() => setStatus('CLOSED'), 5000); // 5 seconds timeout
            }
        }
    };

    return (
        <div>
            <h1>Circuit Breaker Pattern</h1>
            <button onClick={handleRequest}>Make Request</button>
            <p>Status: {status}</p>
            <p>Failure Count: {failureCount}</p>
        </div>
    );
};

export default CircuitBreaker;