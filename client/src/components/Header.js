import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import history from "../history/history";
import LogoutButton from "./LogoutButton";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";

export default class Header extends React.Component {

  componentDidMount() {
    Cookies.get("username");
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
          <Container fluid>
            <Row xs={1} md={2}>
              <Col>
                <Container>
                <div className="text-sm-center text-md-left">
                  <Link to="/">
                    <h1><span className="badge badge-light">To-Do Manager</span></h1>
                  </Link>
                  </div>
                </Container>
              </Col>
              <Col>
                <Container>
                  <div className="text-sm-center text-md-right">
                    {Cookies.get("loggedIn") && 
                    <Dropdown id="header_dropdown" alignRight>
                      <Dropdown.Toggle variant="outline-light" id="dropdown-basic">Přihlášený uživatel: {Cookies.get("username")}</Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item><Button variant="outline-dark" type="button" onClick={this.updateProfile} >Upravit profil</Button></Dropdown.Item>
                        <Dropdown.Item><LogoutButton /></Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    }
                  </div>
                </Container>
              </Col>
            </Row>
          </Container>
        </header>
    );
  }
};