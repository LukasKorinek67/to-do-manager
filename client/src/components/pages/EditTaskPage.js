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

export default class EditTaskPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      _id: 0,
      description: "",
      completed: false,
      informationModalOpen: false,
      error: undefined
    }
    this.loadTask = this.loadTask.bind(this)
    this.editTask = this.editTask.bind(this)
    this.handleModalOptionClose = this.handleModalOptionClose.bind(this)
  }

  componentDidMount() {
    const full = this.props.location.pathname;
    const taskId = full.replace("/editTask/", "")
    const url = '/api/tasks/' + taskId;
    fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
    .then(data => { 
      this.loadTask(data)
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
  
  loadTask(task) {
    this.setState((prevState) => ({
      _id: task._id,
      description: task.description,
      completed: task.completed,
      error: prevState.error
    }))
  }

  editTask(){
    const task = {
      description: document.getElementById("description").value,
      completed: document.getElementById("completed").checked
    }
    if((task.description === this.state.description) && (task.completed === this.state.completed)){
      this.setState((prevState) => ({
        _id: prevState._id,
        description: prevState.description,
        completed: prevState.completed,
        error: "Neprovedli jste žádnou změnu!"
      }))
    } else {
      const url = "/api/tasks/" + this.state._id
      fetch(url, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      }).then(response => response.json())
      .then(data => { this.handleSuccesfulEdit()
      }).catch((error) => {
        console.error('Error:', error);
      });
    }
  }

  handleSuccesfulEdit() {
    this.setState(() => ({
      informationModalOpen: true
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
            <Card className="pageCard">
              <Container>
                <Button variant="light" size="sm" type="button" onClick={this.getBack}>Zpět</Button>
                <h2>Upravit úkol</h2>
                <Form>
                  <Form.Group as={Row} controlId="description">
                    <Form.Label column sm="2">Název úkolu</Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" placeholder="Název" defaultValue={this.state.description} />
                    </Col>
                  </Form.Group>
                  <Form.Group controlId="completed">
                    <Form.Check type="checkbox" label="Splněno" defaultChecked={this.state.completed} />
                  </Form.Group>
                  {this.state.error && <p className="text-danger">{this.state.error}</p>}
                  <Button variant="dark" type="button" onClick={this.editTask}>Upravit úkol</Button>
                </Form>
                <InformationModal
                  show={this.state.informationModalOpen}
                  title={"Úprava úkolu"}
                  message={"Úkol úspěšně upraven"}
                  handleOk={this.handleModalOptionClose} 
                />
              </Container>
            </Card>
          </div>
      </div>
    );
  }
}