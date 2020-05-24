import React from "react";
import Task from "../Task.js"
import { Link } from "react-router-dom";
import Header from "../Header";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

export default class TasksPage extends React.Component {
  state = {
    toDos: [],
    filter: "all"
  };
  filter = () => {
    let filter = document.getElementById("filter");
    let selectedFilter = filter.options[filter.selectedIndex].value;
    this.setState((prevState) => ({ 
      toDos: prevState.toDos,
      filter: selectedFilter
    }))
  };
  componentDidMount() {
    
    fetch("/api/tasks", {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json'
      }
    }).then(response => response.json())
    .then(data => {
      if(data){
        this.setState((prevState) => ({
          toDos: data,
          filter: prevState.filter
        }))
      }
    }).catch((error) => {
      console.error('Error: ', error);
    });
  }

  render() {
    return (
      <div>
        <Header />
          <div className="main_content">
            <Card className="pageCard shadow-lg p-3 mb-5 bg-white rounded">
              <Container>
                <h2>Úkoly:</h2>
                <Row>
                  <Col>
                    <Form>
                      <Form.Group controlId="filter">
                        <Form.Label>Zobrazit úkoly:</Form.Label>
                        <Form.Control as="select" onChange={this.filter} custom>
                          <option value="all">Všechny</option>
                          <option value="incompleted">Nesplněné</option>
                          <option value="completed">Splněné</option>
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col className="my-auto">
                    <Link to="/createTask" ><Button variant="dark" type="button" >Vytvořit nový úkol</Button></Link>
                  </Col>
                </Row>

                {this.state.toDos && 
                <div id="tasks">
                  {/* <Card style={{ width: '18rem' }}> */}
                  <Card>
                    <ListGroup variant="flush">
                      {(this.state.filter === "all" && this.state.toDos) && this.state.toDos.map((toDo, index) => (
                        <ListGroup.Item key={index}><Task key={index} task={toDo}/></ListGroup.Item>
                      ))}
                      {this.state.filter === "completed" && this.state.toDos.map((toDo, index) => (
                        toDo.completed === true && <ListGroup.Item key={index}><Task key={index} task={toDo}/></ListGroup.Item>
                      ))}
                      {this.state.filter === "incompleted" && this.state.toDos.map((toDo, index) => (
                        toDo.completed === false && <ListGroup.Item key={index}><Task key={index} task={toDo}/></ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                  
                </div> }
                {this.state.toDos.length === 0 && <p className="font-weight-lighter">Zatím nemáte žádné úkoly.</p>}

                {((this.state.filter === "completed" && 
                (this.state.toDos.filter((toDo, index) => (toDo.completed===true)).length===0)) && 
                this.state.toDos.length !== 0) && 
                <p className="font-weight-lighter">Nemáte žádné splněné úkoly</p>}

                {((this.state.filter === "incompleted" && 
                (this.state.toDos.filter((toDo, index) => (toDo.completed===false)).length===0)) && 
                this.state.toDos.length !== 0) && 
                <p className="font-weight-lighter">Nemáte žádné nesplněné úkoly</p>}

                <div className="card_bottom"></div>
            
              </Container>
            </Card>
          </div>
      </div>
    );
  }
}