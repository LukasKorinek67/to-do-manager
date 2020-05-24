import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

const NotFoundPage = () => (
  <div>
    <Header />
      <div className="main_content">
        <Card className="pageCard shadow-lg p-3 mb-5 bg-white rounded">
          <Container>
            <h2>404 - <Link to="/">Jít na hlavní stranu</Link></h2>
          </Container>
        </Card>
      </div>
  </div>
);

export default NotFoundPage;