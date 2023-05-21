import React, { Component } from "react";
import { Button, Modal, Table } from "react-bootstrap";

export class DetailsPlayerModal extends Component {
  
  render() {
    return (
      <Modal {...this.props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Player Champions & Participations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Last Trophy</th>
                    <th>Record</th>
                    <th>Max Rating</th>
                    <th>Consecutive Years</th>
                    <th>Current</th>
                </tr>
                </thead>
                <tbody>
                {this.props.plchampions && this.props.plchampions.map((champ) => (
                    <tr key={champ.id}>
                        <td>{champ.lastTrophy}</td>
                        <td>{champ.record}</td>
                        <td>{champ.maxRating}</td>
                        <td>{champ.consecutiveYears}</td>
                        <td>{champ.current}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Date Signed </th>
                    <th>Duration Played</th>
                </tr>
                </thead>
                <tbody>
                {this.props.plparticipations && this.props.plparticipations.map((party) => (
                    <tr>
                        <td>{party.dateSigned}</td>
                        <td>{party.durationPlayed}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  }