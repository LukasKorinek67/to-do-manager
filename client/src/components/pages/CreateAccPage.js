import React from "react";
import { Link } from "react-router-dom";
import history from "../../history/history";
import InformationModal from "../modals/InformationModal";

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
    history.push("/tasks");
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
  
  render() {
    return (
      <div>
        <h2>Vytvořit účet</h2>
        <form>
          <label htmlFor="username"><b>Přihlašovací jméno</b></label>
          <input id="username" type="text" placeholder="Přihlašovací jméno" name="username" required/>
          <label htmlFor="psw"><b>Heslo</b></label>
          <input id="password" type="password" placeholder="Heslo" name="psw" required/>
          <label htmlFor="psw-repeat"><b>Potvrďte heslo</b></label>
          <input id="password-repeat" type="password" placeholder="Heslo znovu" name="psw-repeat" required/>
          {this.state.error && <p>{this.state.error}</p>}
          <div>
              <button type="button" className="button" onClick={this.signUp}>Vytvořit</button>
          </div>
          <div>
            <p>Již máte vytvořený účet?</p>
            <Link to="/login">
              <button type="button" className="button">Přihlásit se</button>
            </Link>
          </div>
        </form>
        <InformationModal
          isOpen={this.state.informationModalOpen}
          message={"Váš profil byl úspěšně vytvořen"}
          handleOk={this.handleModalOptionClose} 
        />
      </div>
    )
  }
}