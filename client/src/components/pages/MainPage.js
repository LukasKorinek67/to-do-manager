import React from "react";
import history from "../../history/history";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";


export default class MainPage extends React.Component {

  goToLogin() {
    history.push("/login")
  }

  goToCreateAcc() {
    history.push("/createAcc")
  }

  render() {
    return (
      <div className="mainPage">
       <div className="mainPage_box">
         <Card bg="light" border="dark" className="mainPage_card" >
           <Container>
             <h1 className="mainPage_h1"><span className="badge badge-dark">To-Do Manager</span></h1>
             <Card bg="light" border="light" className="mainPage_card">
                 <Button className="mainPage_button" variant="outline-dark" size="lg" type="button" block onClick={this.goToLogin} >Přihlásit se</Button>
                 <Button className="mainPage_button" variant="outline-dark" size="lg" type="button" block onClick={this.goToCreateAcc} >Vytvořit účet</Button>
             </Card>
           </Container>
         </Card>
       </div>
     </div>
    )
  }
}