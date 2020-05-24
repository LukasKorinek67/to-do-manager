import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ConfirmationModal = (props) => {
    return(
        <Modal show={props.show} onHide={props.handleNo}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.message}</Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={props.handleYes}>Ano</Button>
                <Button variant="dark" onClick={props.handleNo}>Ne</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ConfirmationModal;