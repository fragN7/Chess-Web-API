import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

export class DescriptionPlayerModal extends Component {
  
  render() {
    return (
      <Modal {...this.props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Chess Player Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <p>{this.props.pldescription}</p>
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