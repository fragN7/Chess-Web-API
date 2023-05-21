import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createBrowserHistory } from 'history';

export function Login({ handleLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'userprofiles/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password,
                username,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.user) {
                    const history = createBrowserHistory();
                    history.push('/users/' + data.user.id);
                    window.location.reload();
                    handleLogin(data.user.userName, data.user.id);
                } else {
                    alert('Login failed');
                }
            });
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '65vh',
            }}
        >
            <h1>Welcome back!</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </Form.Group>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '8vh',
                    }}
                >
                    <Button variant="primary" type="submit" disabled={!username || !password}>
                        Log in
                    </Button>
                </div>
            </Form>
        </div>
    );
}
