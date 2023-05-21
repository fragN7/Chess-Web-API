import React, { Component } from 'react';
import { Button, Modal } from "react-bootstrap";
import { Row, Col, Form} from 'react-bootstrap';
import {Typeahead} from "react-bootstrap-typeahead";

export class AddParticipationModal extends Component {

    constructor(props){
        super(props);
        this.state = { chessPlayers: [], chessTournaments: [], chessPlayerID: 0, chessTournamentID: 0 };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        fetch(process.env.REACT_APP_API+'chesstournaments')
        .then(response => response.json())
        .then(data => {
            this.setState({ chessTournaments: data.data });
        });

        fetch(process.env.REACT_APP_API+'chessplayers')
        .then(response => response.json())
        .then(data => {
            this.setState({ chessPlayers: data.data });
        });

    }

    handleSubmit(event){
        event.preventDefault();

        fetch(process.env.REACT_APP_API+'chessplayers/' + this.state.chessTournamentID + '/participations/' + this.state.chessPlayerID,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                dateSigned: event.target.dateSigned.value,
                durationPlayed: event.target.durationPlayed.value,
                chessPlayerID: this.state.chessPlayerID,
                chessTournamentID: this.state.chessTournamentID,
                description: event.target.description.value
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
                            Add Chess Participation
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Date Signed">
                                        <Form.Label>Date Signed</Form.Label>
                                        <Form.Control type="text" name="dateSigned" required 
                                        placeholder="dd-mm-yyyy"/>
                                    </Form.Group>
                                    <Form.Group controlId="Duration Played">
                                        <Form.Label>Duration Played</Form.Label>
                                        <Form.Control type="text" name="durationPlayed" required 
                                        placeholder="hh-mm-ss"/>
                                    </Form.Group>

                                    <Form.Group controlId="Description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="description" required 
                                        placeholder="Short description about participation"/>
                                    </Form.Group>

                                    <Form.Group controlId="PlayerID">
                                        <Form.Label>Player</Form.Label>
                                        <Typeahead
                                            labelKey="name"
                                            id="player-id-input"
                                            options={this.state.chessPlayers}
                                            placeholder="Select a Chess Player..."
                                            onChange={(selected) => {
                                                if (selected && selected.length > 0) {
                                                    this.setState({ chessPlayerID: selected[0].id });
                                                } else {
                                                    this.setState({ chessPlayerID: null });
                                                }
                                            }}
                                            filterBy={['name']}
                                            renderMenuItemChildren={(option, props, idx) => (
                                                <div key={option.id}>
                                                    {option.name}
                                                </div>
                                            )}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="PlayerID">
                                        <Form.Label>Tournament</Form.Label>
                                        <Typeahead
                                            labelKey="name"
                                            id="player-id-input"
                                            options={this.state.chessTournaments}
                                            placeholder="Select a Chess Tournament..."
                                            onChange={(selected) => {
                                                if (selected && selected.length > 0) {
                                                    this.setState({ chessTournamentID: selected[0].id });
                                                } else {
                                                    this.setState({ chessTournamentID: null });
                                                }
                                            }}
                                            filterBy={['name']}
                                            renderMenuItemChildren={(option, props, idx) => (
                                                <div key={option.id}>
                                                    {option.name}
                                                </div>
                                            )}
                                        />
                                    </Form.Group>

                                    <Form.Group className="my-3">
                                        <Button variant="primary" type="submit" onClick={this.props.onHide}>
                                            Add Chess Participation
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