import React from "react";
import Cookie from "js-cookie";
import history from "../../history/history";
import DeleteAccountButton from "../DeleteAccountButton";
import Header from "../Header";
import InformationModal from "../modals/InformationModal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

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
                <Header />
                    <div className="main_content">
                        <Card className="pageCard shadow-lg p-3 mb-5 bg-white rounded">
                            <Container>
                                <Button variant="light" size="sm" type="button" onClick={this.getBack} >Zpět</Button>
                                <h2>Upravit profil</h2>
                                <Card className="update_card">
                                    <Form>
                                        <Form.Group controlId="username">
                                            <Form.Label>Přihlašovací jméno</Form.Label>
                                            <Form.Control type="text" placeholder="Přihlašovací jméno" defaultValue={Cookie.get("username")}/>
                                        </Form.Group>
                                        {this.state.errorUsername && <p className="text-danger">{this.state.errorUsername}</p>}
                                        <Button variant="dark" type="button" onClick={this.changeUsername}>Změnit přihlašovací jméno</Button>
                                    </Form>
                                </Card>
                                <Card className="update_card">
                                    <Form>
                                        <Form.Group controlId="password">
                                            <Form.Label>Heslo</Form.Label>
                                            <Form.Control type="password" placeholder="Heslo" />
                                        </Form.Group>
                                        <Form.Group controlId="password-repeat">
                                            <Form.Label>Potvrďte heslo</Form.Label>
                                            <Form.Control type="password" placeholder="Heslo znovu" />
                                        </Form.Group>
                                        {this.state.errorPassword && <p className="text-danger">{this.state.errorPassword}</p>}
                                        <Button variant="dark" type="button" onClick={this.changePassword}>Změnit heslo</Button>
                                    </Form>
                                </Card>
                                <DeleteAccountButton />
                                <div className="card_bottom"></div>
                                <InformationModal
                                show={this.state.informationModalOpen}
                                title={"Změna údajů"}
                                message={"Údaje úspěšně změněny"}
                                handleOk={this.handleModalOptionClose} 
                                />
                            </Container>
                        </Card>    
                    </div>
            </div>
        );
    };
}