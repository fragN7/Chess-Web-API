import React, {Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import {Typeahead} from "react-bootstrap-typeahead";

export class UpdatePlayerModal extends Component {

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
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'chessplayers/'+event.target.id.value,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:event.target.id.value,
                name:event.target.name.value,
                country:event.target.country.value,
                rating:event.target.rating.value,
                isMaster:event.target.isMaster.value,
                startYear: event.target.startYear.value,
                description: event.target.description.value,
                userId: this.state.userID
            })
        })
        .then(res=>res.json())
        .then(
            ()=>{
                alert('Updated successfully!');
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
                            Update Chess Player
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={7}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="ID" hidden>
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control type="text" name="id" required
                                        disabled
                                        defaultValue={this.props.plid} 
                                        placeholder="ID"/>
                                    </Form.Group>
                                    <Form.Group controlId="Name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" required 
                                        defaultValue={this.props.plname} 
                                        placeholder="Name"/>
                                    </Form.Group>
                                    <Form.Group controlId="Country">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control type="text" name="country" required 
                                        defaultValue={this.props.plcountry}
                                        placeholder="Country"/>
                                    </Form.Group>
                                    <Form.Group controlId="Rating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control type="number" name="rating" required
                                        defaultValue={this.props.plrating} 
                                        placeholder="0-5000"/>
                                    </Form.Group>
                                    <Form.Group controlId="IsMaster">
                                        <Form.Label>IsMaster</Form.Label>
                                        <Form.Control type="number" name="isMaster" required 
                                        defaultValue={this.props.plismaster}
                                        placeholder="0 or 1"/>
                                    </Form.Group>
                                    <Form.Group controlId="PlayerStartYear">
                                        <Form.Label>StartYear</Form.Label>
                                        <Form.Control type="number" name="startYear" required
                                        defaultValue={this.props.plstartyear} 
                                        placeholder="1701-2023"/>
                                    </Form.Group>
                                    <Form.Group controlId="Description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="description" required 
                                        defaultValue={this.props.pldescription} 
                                        placeholder="Short description about player"/>
                                    </Form.Group>

                                    <Form.Group controlId="UserID">
                                        <Form.Label>User ID</Form.Label>
                                        <Typeahead
                                            labelKey="email"
                                            id="user-id-input"
                                            options={this.state.searchResults}
                                            placeholder="Select a User..."
                                            onChange={(selected) => {
                                                if (selected && selected.length > 0) {
                                                    this.setState({ userID: selected[0].id });
                                                } else {
                                                    this.setState({ userID: null });
                                                }
                                            }}
                                            filterBy={['email']}
                                            renderMenuItemChildren={(option, props, idx) => (
                                                <div key={option.id}>
                                                    {option.email}
                                                </div>
                                            )}
                                        />
                                    </Form.Group>

                                    <Form.Group className="my-3">
                                        <Button variant="primary" type="submit" onClick={this.props.onHide}>
                                            Update Chess Player
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