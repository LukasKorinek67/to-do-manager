import React from "react";
import history from "../history/history";
import ConfirmationModal from "./modals/ConfirmationModal";
import InformationModal from "./modals/InformationModal";

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
            <div>
                <p>{this.props.task.description}, {this.props.task.completed? "SPLNĚNO!" : "NESPLNĚNO!"}</p>
                <button id="editTask" type="button" className="button" onClick={this.editTask}>Upravit úkol</button>
                <button id="deleteTask" type="button" className="button" onClick={this.deleteTask}>Odstranit úkol</button>
                
                <ConfirmationModal
                  isOpen={this.state.confirmationModalOpen}
                  message={"Opravdu chcete odstranit tento úkol?"}
                  handleYes={this.handleModalOptionYes} 
                  handleNo={this.handleModalOptionNo}
                />
                <InformationModal
                  isOpen={this.state.informationModalOpen}
                  message={"Úkol úspěšně odstraněn"}
                  handleOk={this.handleModalOptionClose} 
                />
            </div>
        )
    }
}