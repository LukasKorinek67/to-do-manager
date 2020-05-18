import React from "react";
import Modal from "react-modal";

const ConfirmationModal = (props) => {
    
    return(
        <Modal isOpen={props.isOpen} ariaHideApp={false} onRequestClose={props.handleOk}>
            {props.message && <p>{props.message}</p>}
            <button type="button" className="button" onClick={props.handleOk}>Ok</button>
        </Modal>
    )
};

export default ConfirmationModal;