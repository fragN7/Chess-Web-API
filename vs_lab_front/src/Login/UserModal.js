import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export function UserModal(props) {
    const [editedUsername, setEditedUsername] = useState(props.foundUser.username);

    const handleUsernameChange = (event) => {
        setEditedUsername(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API}userprofiles/${props.foundUser.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: editedUsername,
                    }),
                }
            );
            if (response.ok) {
                // handle success
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={editedUsername}
                        onChange={handleUsernameChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Bio</Form.Label>
                    <Form.Control type="text" defaultValue={props.foundUser.bio} readOnly />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Birthdate</Form.Label>
                    <Form.Control
                        type="date"
                        defaultValue={props.foundUser.birthDate}
                        readOnly
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="tel"
                        defaultValue={props.foundUser.phoneNumber}
                        readOnly
                    />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '0.5rem', display: 'block' }}>
                    Save
                </Button>
            </Form>
        </>
    );
}
