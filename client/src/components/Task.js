import React from "react";
import history from "../history/history";
import ConfirmationModal from "./modals/ConfirmationModal";
import InformationModal from "./modals/InformationModal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default class Task extends React.Component {

constructor(props) {
    super(props)
    this.state = {
      confirmationModalOpen: false,
      informationModalOpen: false
    }
    this.editTask = this.editTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.handleModalOptionYes = this.handleModalOptionYes.bind(this)
    this.handleModalOptionNo = this.handleModalOptionNo.bind(this)
    this.handleModalOptionClose = this.handleModalOptionClose.bind(this)
}

    editTask() {
        console.log("editTask " + this.props.task._id)
        const url = "/editTask/" + this.props.task._id;
        history.push(url)
    }
    deleteTask() {
      this.setState(() => ({
        confirmationModalOpen: true
      }))
    }

    handleSuccessfulDelete(){
      this.setState(() => ({
        informationModalOpen: true
      }))
    }

    handleModalOptionYes() {
      this.setState(() => ({
        confirmationModalOpen: false
      }))
      const url = "/api/tasks/" + this.props.task._id;
      fetch(url, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(data => {
          if(data){
            this.handleSuccessfulDelete()
          }
        }).catch((error) => {
          console.error('Error:', error);
        });
    }
  
    handleModalOptionNo() {
      this.setState(() => ({
        confirmationModalOpen: false
      }))
    }

    handleModalOptionClose() {
      this.setState(() => ({
        informationModalOpen: false
      }))
      window.location.reload()
    }

    render() {
        return (
              <div className="task">
                <Container>
                  <Row>
                    <Col className="task_text"><p>{this.props.task.completed? "✅" : "❌"} {this.props.task.description}</p></Col>
                    <Col>
                      <Button size="sm" variant="outline-dark" onClick={this.editTask}>Upravit</Button><span> </span>
                      <Button variant="outline-dark" size="sm" onClick={this.deleteTask}>Odstranit 🗑</Button>
                    </Col>
                  </Row>
                </Container>
                
                <ConfirmationModal
                  show={this.state.confirmationModalOpen}
                  title={"Odstranění úkolu"}
                  message={"Opravdu chcete odstranit tento úkol?"}
                  handleYes={this.handleModalOptionYes} 
                  handleNo={this.handleModalOptionNo}
                />
                <InformationModal
                  show={this.state.informationModalOpen}
                  title={"Odstranění úkolu"}
                  message={"Úkol úspěšně odstraněn"}
                  handleOk={this.handleModalOptionClose} 
                />
            </div>
        )
    }
}