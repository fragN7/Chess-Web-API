import { Component } from 'react';
import { Button, Modal, Table } from "react-bootstrap";

export class DetailsParticipationModal extends Component {

    render() {
        return (
          <Modal {...this.props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered >
            <Modal.Header closeButton>
              <Modal.Title id='contained-modal-title-vcenter'>Participation Player & Tournament</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Rating</th>
                        <th>Is Master</th>
                        <th>Start Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.prplayer ? (
                            <tr>
                                <td>{this.props.prplayer.name}</td>
                                <td>{this.props.prplayer.country}</td>
                                <td>{this.props.prplayer.rating}</td>
                                <td>{this.props.prplayer.isMaster}</td>
                                <td>{this.props.prplayer.startYear}</td>
                            </tr>
                    ) : (
                        <tr>
                            <td colSpan="5">Loading...</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Participants</th>
                        <th>Host</th>
                        <th>Prize Money</th>
                        <th>Trophy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.prtournament ? (
                            <tr>
                                <td>{this.props.prtournament.name}</td>
                                <td>{this.props.prtournament.numParticipants}</td>
                                <td>{this.props.prtournament.host}</td>
                                <td>{this.props.prtournament.prizeMoney}</td>
                                <td>{this.props.prtournament.trophy}</td>
                            </tr>
                    ) : (
                        <tr>
                            <td colSpan="5">Loading...</td>
                        </tr>
                    )}
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