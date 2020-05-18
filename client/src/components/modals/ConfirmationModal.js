import React from "react";
import Modal from "react-modal";

const ConfirmationModal = (props) => {
    
    return(
        <Modal isOpen={props.isOpen} ariaHideApp={false} onRequestClose={props.handleNo}>
            {props.message && <p>{props.message}</p>}
            <button type="button" className="button" onClick={props.handleYes}>Ano</button>
            <button type="button" className="button" onClick={props.handleNo}>Ne</button>
        </Modal>
    )
};

export default ConfirmationModal;