import React from "react";
import history from "../../history/history";
import InformationModal from "../modals/InformationModal";

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
        <button type="button" className="button" onClick={this.getBack}>Zpět</button>
        <h2>Vytvořit úkol</h2>
        <label htmlFor="description"><b>Název úkolu</b></label>
        <input id="description" type="text" placeholder="Název" name="description" required></input>
        <label>
          <input id="completed" type="checkbox" name="done"/> Splněno
        </label>
        <button type="button" className="button" onClick={this.createTask}>Vytvořit úkol</button>
        {this.state.error && <p>{this.state.error}</p>}
        <InformationModal
          isOpen={this.state.informationModalOpen}
          message={"Úkol úspěšně vytvořen"}
          handleOk={this.handleModalOptionClose} 
        />
      </div>
    )
  };
};