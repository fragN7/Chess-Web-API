import React, {Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import {Typeahead} from "react-bootstrap-typeahead";

export class AddTournamentModal extends Component {

    constructor(props){
        super(props);
        this.state = {userID: 0, currentPage: 1, itemsPerPage: 5, searchResults: []};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { currentPage, itemsPerPage } = this.state;
        const url = `${process.env.REACT_APP_API}userprofiles?page=${currentPage}&limit=${itemsPerPage}`;

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

        fetch(process.env.REACT_APP_API+'chesstournaments',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:event.target.name.value,
                numParticipants:event.target.numParticipants.value,
                host:event.target.host.value,
                prizeMoney:event.target.prizeMoney.value,
                trophy: event.target.trophy.value,
                description: event.target.description.value,
                userId: this.state.userID
            })
        })
        .then(res=>res.json())
        .then(()=>{
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
                            Add Chess Tournament
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
                                    </Form.Group>
                                    <Form.Group controlId="NumParticipants">
                                        <Form.Label>Participants</Form.Label>
                                        <Form.Control type="number" name="numParticipants" required 
                                        placeholder="Participant Number"/>
                                    </Form.Group>
                                    <Form.Group controlId="Host">
                                        <Form.Label>Host</Form.Label>
                                        <Form.Control type="text" name="host" required 
                                        placeholder="Host"/>
                                    </Form.Group>
                                    <Form.Group controlId="PrizeMoney">
                                        <Form.Label>Prize Money</Form.Label>
                                        <Form.Control type="number" name="prizeMoney" required 
                                            placeholder=">0" />
                                        {this.state.prizeError && <Form.Text className="text-danger">{this.state.prizeError}</Form.Text>}
                                    </Form.Group>
                                    <Form.Group controlId="Trophy">
                                        <Form.Label>Trophy</Form.Label>
                                        <Form.Control type="text" name="trophy" required 
                                            placeholder="Trophy" />
                                        {this.state.trophyError && <Form.Text className="text-danger">{this.state.trophyError}</Form.Text>}
                                    </Form.Group>
                                    <Form.Group controlId="Description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="description" required 
                                        placeholder="Short description about tournament"/>
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
                                        <Button variant="primary" type="submit">
                                            Add Chess Tournament
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