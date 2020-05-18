import React from "react";
import Cookie from "js-cookie";
import history from "../../history/history";
import DeleteAccountButton from "../DeleteAccountButton";
import InformationModal from "../modals/InformationModal";

export default class TasksPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            informationModalOpen: false,
            errorUsername: undefined,
            errorPassword: undefined
        }
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.changeDetails = this.changeDetails.bind(this)
        this.handleSuccesfulUpdate = this.handleSuccesfulUpdate.bind(this)
        this.handleModalOptionClose = this.handleModalOptionClose.bind(this)
    }

    changeUsername(e) {
        e.preventDefault();
        const user = {
            username: document.getElementById("username").value
        }
        if(user.username === Cookie.get("username")) {
            this.setState(() => ({
                errorUsername: "Neprovedli jste žádnou změnu!",
                errorPassword: undefined
            }))
        } else {
            this.changeDetails(user)
        }
    }

    changePassword(e) {
        e.preventDefault();
        const password = document.getElementById("password").value
        const passwordRepeat = document.getElementById("password-repeat").value
        if(password !== passwordRepeat){
            this.setState(() => ({
                errorUsername: undefined,
                errorPassword: "Zadaná hesla se neshodují!"
            }))
        } else if(password.length < 7) {
            this.setState(() => ({
                errorUsername: undefined,
                errorPassword: "Heslo musí obsahovat alespoň 7 znaků!"
            }))
        } else if (password.toLowerCase().includes("heslo")) {
            this.setState(() => ({
                errorUsername: undefined,
                errorPassword: "Heslo nemůže obsahovat slovo heslo!"
            }))
        } else {
            const user = {
                password: password
            }
            this.changeDetails(user)
        }
    }

    changeDetails(user){
        fetch("/api/users/me", {
            method: 'PATCH',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            if(response.status === 400){
                if(user.username){
                    this.setState(() => ({
                        errorUsername: "Toto přihlašovací jméno je již zabrané.",
                        errorPassword: undefined
                    }))
                } else {
                    this.setState(() => ({
                        errorUsername: undefined,
                        errorPassword: "Heslo musí obsahovat alespoň 7 znaků! (mezery na začátku a na konci se nepočítají)"
                    }))
                }
              throw new Error();
            }
            return response.json()
        })
        .then(data => {
            if(data){
                this.handleSuccesfulUpdate()
            }
        }).catch((error) => {
            // nedělat už nic
        });
    }

    handleSuccesfulUpdate() {
        this.setState(() => ({
            informationModalOpen: true,
        }))
    }

    handleModalOptionClose() {
        this.setState(() => ({
            informationModalOpen: false,
        }))
        window.location.reload()
    }

    getBack() {
        history.push("/tasks")
    }

    render() {
        return (
          <div>
                <button type="button" className="button" onClick={this.getBack}>Zpět</button>
                <h2>Upravit profil</h2>
                <form>
                    <div>
                        <label htmlFor="username"><b>Přihlašovací jméno</b></label>
                        <input id="username" type="text" placeholder="Přihlašovací jméno" name="username" defaultValue={Cookie.get("username")} required/>
                        <button type="button" className="button" onClick={this.changeUsername}>Změnit přihlašovací jméno</button>
                        {this.state.errorUsername && <p>{this.state.errorUsername}</p>}
                    </div>
                </form>
                <form>
                    <div>
                        <label htmlFor="psw"><b>Heslo</b></label>
                        <input id="password" type="password" placeholder="Heslo" name="psw" required/>
                        <label htmlFor="psw-repeat"><b>Potvrďte heslo</b></label>
                        <input id="password-repeat" type="password" placeholder="Heslo znovu" name="psw-repeat" required/>
                        <button type="button" className="button" onClick={this.changePassword}>Změnit heslo</button>
                        {this.state.errorPassword && <p>{this.state.errorPassword}</p>}
                    </div>
                </form>
                <DeleteAccountButton />
                <InformationModal
                  isOpen={this.state.informationModalOpen}
                  message={"Údaje úspěšně změněny"}
                  handleOk={this.handleModalOptionClose} 
                />
          </div>
        );
    };
}