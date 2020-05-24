import React from "react";
import { Link } from "react-router-dom";
import history from "../../history/history";
import Header from "../Header";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

export default class LoginPage extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      error: undefined
    }
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
    this.login = this.login.bind(this)
  }
  
  handleSuccessfulAuth() {
    window.location.reload()
  }

  login = (e) => {
    e.preventDefault();
    const user = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    }
    if(user.username === "" || user.password === "" ) {
      this.setState(() => ({
        error: "Vyplňte prosím všechna pole!"
      }))
    } else if(user.password.length < 7) {
      this.setState(() => ({
        error: "Heslo musí obsahovat alespoň 7 znaků!"
      }))
    } else {
      fetch("/api/users/login", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then(response => {
        if(response.status === 400){
          this.setState(() => ({
            error: "Nesprávné údaje!"
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
                <h2>Přihlášení</h2>
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
                  {this.state.error && <p className="text-danger">{this.state.error}</p>}
                  <Button variant="dark" type="button" onClick={this.login}>Přihlásit se</Button>
                  <div className="main_card_footer">
                    <Card.Footer>
                      <p>Nemáte vytvořený účet?</p>
                      <Link to="/createAcc">
                        <Button variant="outline-dark" type="button" >Vytvořit účet</Button>
                      </Link>
                    </Card.Footer>
                  </div>
                </Form>
                <div className="card_bottom"></div>
              </Container>
            </Card>
          </div>
      </div>
    )
  }
}