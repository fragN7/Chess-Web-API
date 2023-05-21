import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
            bio: '',
            birthDate: '',
            phoneNumber: '',
            confirmationCode: '',
            inputConfirmationCode: '',
            isActive: false,
            currentStep: 1
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStep1Submit = this.handleStep1Submit.bind(this);
        this.handleStep2Submit = this.handleStep2Submit.bind(this);
    }

    handleInputChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleStep1Submit(event) {
        event.preventDefault();
        const {password, confirmPassword} = this.state;
        if (password.length < 8) {
            alert("Passwords do short!");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        fetch(process.env.REACT_APP_API + 'userprofiles/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: this.state.password,
                username: this.state.username,
                bio: this.state.bio,
                birthDate: this.state.birthDate,
                phoneNumber: this.state.phoneNumber
            })
        })
            .then(res => res.json())
            .then(data => {
                alert(`Confirmation code: ${data.confirmationCode}`);
                this.setState({currentStep: 2, confirmationCode: data.confirmationCode});
            })
            .catch(error => {
                console.error('Registration failed:', error);
                alert('Registration failed');
            });
    }


    handleStep2Submit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'userprofiles/register/confirm/' + this.state.inputConfirmationCode, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: this.state.password,
                username: this.state.username
            })
        })
            .then(res => res.json())
            .then(
                () => {
                    alert("Account registered!");
                },
                () => {
                    alert('Failed');
                }
            );
    }

    render() {
        const {currentStep} = this.state;

        let stepForm;
        if (currentStep === 1) {
            stepForm = (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '0vh' }}>
                        <h1>Hello new motherfucker, COYG</h1>
                        <Form onSubmit={this.handleStep1Submit}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: '20px' }}>
                                    <Form.Group controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} required />
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required />
                                    </Form.Group>
                                    <Form.Group controlId="confirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange} required />
                                    </Form.Group>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Form.Group controlId="bio">
                                        <Form.Label>Bio</Form.Label>
                                        <Form.Control as="textarea" name="bio" rows={1} cols={22} value={this.state.bio} onChange={this.handleInputChange} required />
                                    </Form.Group>
                                    <Form.Group controlId="birthDate">
                                        <Form.Label>Birth Date</Form.Label>
                                        <Form.Control type="date" name="birthDate" value={this.state.birthDate} onChange={this.handleInputChange} required />
                                    </Form.Group>
                                    <Form.Group controlId="phoneNumber">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="tel" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInputChange} required />
                                    </Form.Group>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '8vh' }}>
                                <Button variant="primary" type="submit"
                                        disabled={!this.state.username || !this.state.password || !this.state.confirmPassword
                                                    || !this.state.bio || !this.state.birthDate || !this.state.phoneNumber}>
                                    Continue
                                </Button>
                            </div>
                        </Form>
                    </div>
            );
        } else {
            stepForm = (
                <Form onSubmit={this.handleStep2Submit}>
                    <Form.Group controlId="inputConfirmationCode">
                        <Form.Label>Please enter the confirmation code provided</Form.Label>
                        <Form.Control as="input" name="inputConfirmationCode" value={this.state.inputConfirmationCode}
                                      onChange={this.handleInputChange}/>
                    </Form.Group>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '8vh' }}>
                        <Button variant="primary" type="submit" disabled={!this.state.username}>
                            Register
                        </Button>
                    </div>
                </Form>
            );
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '65vh' }}>
                {stepForm}
            </div>
        );
    }
}
