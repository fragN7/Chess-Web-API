import React, { Component } from "react";
import { Button, Modal, Table } from "react-bootstrap";

export class DetailsTournamentModal extends Component {
  
  render() {
    return (
      <Modal {...this.props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Tournament Participations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date Signed</th>
                  <th>Duration Played</th>
                </tr>
              </thead>
              <tbody>
                {this.props.trparticipations && this.props.trparticipations.map((participation) => (
                  <tr key={participation.id}>
                    <td>{participation.dateSigned}</td>
                    <td>{participation.durationPlayed}</td>
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