import React from "react";
import Cookies from "js-cookie";
import ConfirmationModal from "./modals/ConfirmationModal";
import InformationModal from "./modals/InformationModal";

export default class TasksPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            confirmationModalOpen: false,
            informationModalOpen: false,
        }
        this.handleSuccesfulDelete = this.handleSuccesfulDelete.bind(this)
        this.deleteAccount = this.deleteAccount.bind(this)
        this.handleModalOptionYes = this.handleModalOptionYes.bind(this)
        this.handleModalOptionNo = this.handleModalOptionNo.bind(this)
        this.handleModalOptionClose = this.handleModalOptionClose.bind(this)
    }

    deleteAccount() {
        this.setState(() => ({
            confirmationModalOpen: true,
        }))
    }

    handleModalOptionYes() {
        this.setState(() => ({
            confirmationModalOpen: false,
        }))
        //deleteUser
        fetch("/api/users/me", {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            }
        }).then(this.handleSuccesfulDelete()
        ).catch((error) => {
            console.error('Error:', error);
        });
    }

    handleModalOptionNo() {
        this.setState(() => ({
            confirmationModalOpen: false,
        }))
    }

    handleModalOptionClose() {
        this.setState(() => ({
            informationModalOpen: false,
        }))
        Cookies.remove("username")
        Cookies.remove("auth_token")
        Cookies.remove("loggedIn")
        window.location.reload()
    }

    handleSuccesfulDelete() {
        this.setState(() => ({
            informationModalOpen: true,
        }))
    }

    render() {
        return (
            <div>
                <button type="button" className="button" onClick={this.deleteAccount}>Smazat účet</button>
                <ConfirmationModal
                  isOpen={this.state.confirmationModalOpen}
                  message={"Opravdu chcete odstranit tento účet?"}
                  handleYes={this.handleModalOptionYes} 
                  handleNo={this.handleModalOptionNo}
                />
                <InformationModal
                  isOpen={this.state.informationModalOpen}
                  message={"Váš účet byl odstraněn"}
                  handleOk={this.handleModalOptionClose} 
                />
            </div>
        )
    }
}