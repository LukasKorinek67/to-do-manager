import React from "react";
import Cookies from "js-cookie";
import ConfirmationModal from "./modals/ConfirmationModal";

export default class TasksPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            confirmationModalOpen: false,
        }
        this.logout = this.logout.bind(this)
        this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this)
        this.handleModalOptionYes = this.handleModalOptionYes.bind(this)
        this.handleModalOptionNo = this.handleModalOptionNo.bind(this)
    }

    handleSuccessfulLogout(){
        Cookies.remove("username")
        Cookies.remove("auth_token")
        Cookies.remove("loggedIn")
        window.location.reload()
      }

    handleModalOptionYes() {
        this.setState(() => ({
            confirmationModalOpen: false
        }))
        fetch("/api/users/logout", {
          method: 'POST',
          credentials: 'include'
        }).then(this.handleSuccessfulLogout())
        .catch((error) => {
          console.log('Error: ', error)
        });
      }
    
      handleModalOptionNo() {
        this.setState(() => ({
            confirmationModalOpen: false
        }))
      }
    
      logout() {
        this.setState(() => ({
            confirmationModalOpen: true
        }))
      }

    render() {
        return (
            <div>
                {Cookies.get("loggedIn") && <button type="button" className="button" onClick={this.logout}>Odhlásit se</button>}
                <ConfirmationModal
                    isOpen={this.state.confirmationModalOpen}
                    message="Opravdu se chcete odhlásit?"
                    handleYes={this.handleModalOptionYes} 
                    handleNo={this.handleModalOptionNo}
                />
            </div>
        )
    }
}