import React from "react";
import history from "../../history/history";
import InformationModal from "../modals/InformationModal";

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
      console.log(data)
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
        <button type="button" className="button" onClick={this.getBack}>Zpět</button>
        <h2>Upravit úkol</h2>
        <label htmlFor="description"><b>Název úkolu</b></label>
        <input id="description" type="text" placeholder="Description" name="description" defaultValue={this.state.description} required></input>
        <label>
        <input id="completed" type="checkbox" name="done" defaultChecked={this.state.completed} /> Splněno
        </label>
        <button type="button" className="button" onClick={this.editTask}>Upravit úkol</button>
        {this.state.error && <p>{this.state.error}</p>}
        <InformationModal
          isOpen={this.state.informationModalOpen}
          message={"Úkol úspěšně upraven"}
          handleOk={this.handleModalOptionClose} 
        />
      </div>
    );
  }
}