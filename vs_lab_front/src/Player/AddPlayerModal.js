import React, {Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export class AddPlayerModal extends Component {

    constructor(props){
        super(props);
        this.state = {userID: 0, searchResults: []};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const url = `${process.env.REACT_APP_API}userprofiles`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    searchResults: data.data.map(user => ({ id: user.id, email: user.email }))
                });
            });
    }

    handleSubmit(event){
        //event.preventDefault();

        fetch(process.env.REACT_APP_API+'chessplayers',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:event.target.name.value,
                country:event.target.country.value,
                rating:event.target.rating.value,
                isMaster:event.target.isMaster.value,
                startYear: event.target.startYear.value,
                description: event.target.description.value,
                userId: 5
            })
        })
        .then(res=>res.json())
        .then(
            ()=>{
            alert('Added successfully!');
        },
        ()=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className="container">
                <Modal {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Chess Player
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" required 
                                        placeholder="Name"/>
                                    
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control type="text" name="country" required 
                                        placeholder="Country"/>
                                    
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control type="number" name="rating" required 
                                        placeholder="0-5000"/>
                                    
                                        <Form.Label>IsMaster</Form.Label>
                                        <Form.Control type="number" name="isMaster" required 
                                        placeholder="0 or 1"/>
                                    
                                        <Form.Label>StartYear</Form.Label>
                                        <Form.Control type="number" name="startYear" required 
                                        placeholder="1701-2023"/>
                                   
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="description" required 
                                        placeholder="Short description about player"/>
                                        
                                        <Button variant="primary" type="submit">
                                            Add Chess Player
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}