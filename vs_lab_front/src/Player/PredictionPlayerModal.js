import React, { Component } from "react";
import {Button, Modal, Table} from "react-bootstrap";

export class PredictionPlayerModal extends Component {

    render() {
        return (
            <Modal {...this.props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered >
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>Probability of Being a Champion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <p>{this.props.score >= 1 ? "99.99%" : (this.props.score * 100).toFixed(2) + "%"}</p>
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