import React, { Component } from "react";
import { Button, Modal, Table } from "react-bootstrap";

export class DetailsChampionModal extends Component {
  
  render() {
    return (
      <Modal {...this.props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Player Champion</Modal.Title>
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
                    {this.props.chplayer ? (
                        <tr>
                            <td>{this.props.chplayer.name}</td>
                            <td>{this.props.chplayer.country}</td>
                            <td>{this.props.chplayer.rating}</td>
                            <td>{this.props.chplayer.isMaster}</td>
                            <td>{this.props.chplayer.startYear}</td>
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