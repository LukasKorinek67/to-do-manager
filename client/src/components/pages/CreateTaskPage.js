import React from "react";
import history from "../../history/history";
import Header from "../Header";
import InformationModal from "../modals/InformationModal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default class CreateTaskPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      informationModalOpen: false,
      error: undefined
    }
    this.createTask = this.createTask.bind(this)
    this.handleSuccessfulCreate = this.handleSuccessfulCreate.bind(this)
    this.handleModalOptionClose = this.handleModalOptionClose.bind(this)
  }
  
  createTask = () => {
    const task = {
      description: document.getElementById("description").value,
      completed: document.getElementById("completed").checked
    }
    if(task.description === "") {
      this.setState(() => ({
        error: "Musíte vyplnit název úkolu!"
      }))
    } else {
      fetch("/api/tasks", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      }).then(response => response.json())
      .then(this.handleSuccessfulCreate())
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }

  handleSuccessfulCreate() {
    this.setState(() => ({
      informationModalOpen: true,
      error: undefined
    }))
  }
  
  handleModalOptionClose() {
    this.setState(() => ({
      informationModalOpen: false
    }))
    history.push("/tasks")
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
                <Button variant="light" size="sm" type="button" onClick={this.getBack}>Zpět</Button>
                <h2>Vytvořit úkol</h2>
                <Form>
                  <Form.Group as={Row} controlId="description">
                    <Form.Label column sm="2">Název úkolu</Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" placeholder="Název" />
                    </Col>
                  </Form.Group>
                  <Form.Group controlId="completed">
                    <Form.Check type="checkbox" label="Splněno" />
                  </Form.Group>
                  {this.state.error && <p className="text-danger">{this.state.error}</p>}
                  <Button variant="dark" type="button" onClick={this.createTask}>Vytvořit úkol</Button>
                  <div className="card_bottom"></div>
                </Form>
                <InformationModal
                  show={this.state.informationModalOpen}
                  title={"Vytvoření úkolu"}
                  message={"Úkol úspěšně vytvořen"}
                  handleOk={this.handleModalOptionClose} 
                />
              </Container>
            </Card>
          </div>
      </div>
    )
  };
};