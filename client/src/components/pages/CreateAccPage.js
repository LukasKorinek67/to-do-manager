import React from "react";
import { Link } from "react-router-dom";
import history from "../../history/history";
import Header from "../Header";
import InformationModal from "../modals/InformationModal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

export default class CreateAccPage extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      informationModalOpen: false,
      error: undefined
    }
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
    this.handleModalOptionClose = this.handleModalOptionClose.bind(this)
    this.signUp = this.signUp.bind(this)
  }

  handleSuccessfulAuth() {
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

  signUp = () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let passwordRepeat = document.getElementById("password-repeat").value;

    if(username === "" || password === "" || passwordRepeat === "") {
      this.setState(() => ({
        error: "Vyplňte prosím všechna pole!"
      }))
    } else if (password !== passwordRepeat) {
      this.setState(() => ({
        error: "Hesla se neshodují!"
      }))
    } else if (password.length < 7) {
      this.setState(() => ({
        error: "Heslo musí obsahovat alespoň 7 znaků!"
      }))
    } else if (password.toLowerCase().includes("heslo")) {
      this.setState(() => ({
        error: "Heslo nemůže obsahovat slovo heslo!"
      }))
    } else {
      const user = {
        username: username,
        password: password
      }
      fetch("/api/users", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then(response => {
        if(response.status === 400){
          this.setState(() => ({
            error: "Toto přihlašovací jméno je již zabrané."
          }))
          throw new Error();
        }
        return response.json()
      })
      .then(data => {
        if(data.user){
          this.handleSuccessfulAuth()
        }
      }).catch((error) => {
        // nedělat už nic
      });
    }
  }

  getBack() {
    history.push("/")
  }
  
  render() {
    return (
      <div>
        <Header />
        <div className="main_content">
          <Card className="pageCard shadow-lg p-3 mb-5 bg-white rounded">
            <Container>
              <Button variant="light" size="sm" type="button" onClick={this.getBack} >Zpět</Button>
              <h2>Vytvořit účet</h2>
              <Form>
                <Form.Group controlId="username">
                  <Form.Label>Přihlašovací jméno</Form.Label>
                  <Form.Control type="text" placeholder="Přihlašovací jméno" />
                  <Form.Text className="text-muted">
                    Vaše údaje jsou zpracovány zabezpečeně.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Heslo</Form.Label>
                  <Form.Control type="password" placeholder="Heslo" />
                </Form.Group>
                <Form.Group controlId="password-repeat">
                  <Form.Label>Potvrďte heslo</Form.Label>
                  <Form.Control type="password" placeholder="Heslo znovu" />
                </Form.Group>
                {this.state.error && <p className="text-danger">{this.state.error}</p>}
                <Button variant="dark" type="button" onClick={this.signUp}>Vytvořit účet</Button>
                <div className="main_card_footer">
                  <Card.Footer>
                    <p>Již máte vytvořený účet?</p>
                    <Link to="/login">
                      <Button variant="outline-dark" type="button" >Přihlásit se</Button>
                    </Link>
                  </Card.Footer>
                </div>
              </Form>
              <InformationModal
                show={this.state.informationModalOpen}
                title={"Vytvoření profilu"}
                message={"Váš profil byl úspěšně vytvořen"}
                handleOk={this.handleModalOptionClose} 
              />
              <div className="card_bottom"></div>
            </Container>
          </Card>
        </div>
      </div>
    )
  }
}