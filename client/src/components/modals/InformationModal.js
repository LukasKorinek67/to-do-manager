import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ConfirmationModal = (props) => {
    
    return(

        <Modal show={props.show} onHide={props.handleOk}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.message}</Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={props.handleOk}>Ok</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ConfirmationModal;