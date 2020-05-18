import React from "react";
import { Link } from "react-router-dom";
import history from "../../history/history";

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
    history.push("/tasks");
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
  
  render() {
    return (  
      <div>
        <h2>Přihlášení</h2>
        <form>
          <label htmlFor="username"><b>Přihlašovací jméno</b></label>
          <input id="username" type="text" placeholder="Přihlašovací jméno" name="username" required/>
          <label htmlFor="psw"><b>Heslo</b></label>
          <input id="password" type="password" placeholder="Heslo" name="psw" required/>
          {this.state.error && <p>{this.state.error}</p>}
          <div>
            <button type="button" className="button" onClick={this.login}>Přihlásit</button>
          </div>
          <div>
          <p>Nemáte vytvořený účet?</p>
            <Link to="/createAcc">
              <button type="button" className="button">Vytvořit účet</button>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}