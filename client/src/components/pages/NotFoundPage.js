import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

const NotFoundPage = () => (
  <div>
    <Header />
      <div className="main_content">
        <Card bg={"dark"} className="pageCard shadow-lg p-3 mb-5 bg-white rounded">
          <Container>
            <h2 id="page404_title" className="text-sm-center text-md-left">Error 404 - tato stránka nebyla nenalezena</h2>
            <Link to="/">
              <Button variant="outline-dark" size="sm" type="button">Jít na hlavní stranu</Button>
            </Link>
            <div className="card_bottom"></div>
          </Container>
        </Card>
      </div>
  </div>
);

export default NotFoundPage;