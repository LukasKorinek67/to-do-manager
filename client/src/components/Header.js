import React from "react";
import Cookies from "js-cookie";
import history from "../history/history";
import LogoutButton from "./LogoutButton";


export default class Header extends React.Component {

  componentDidMount() {
    Cookies.get("username");
    console.log(this.props.loggedIn)
  }

  componentDidUpdate() {
    Cookies.get("username");
  }

  updateProfile() {
    history.push("/updateProfile");
  }

  render() {
    return ( 
      <header>
          <div>
            <h1>To-Do-Manager</h1>
          </div>
          <div>
            {Cookies.get("username") && <p>Přihlášený uživatel: {Cookies.get("username")}</p>}
          </div>  
          <div>
            {Cookies.get("loggedIn") && <LogoutButton />}
            {Cookies.get("loggedIn") && <button type="button" className="button" onClick={this.updateProfile}>Upravit profil</button>}
          </div>
          <p>---------------------------------------------------------</p>
        </header>
    );
  }
};