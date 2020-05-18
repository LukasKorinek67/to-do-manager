import React from "react";
import Task from "../Task.js"
import { Link } from "react-router-dom";

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
        <div>
          <h2>Úkoly:</h2>
          <Link to="/createTask" ><button type="button" className="button" >Vytvořit úkol</button></Link>
        </div>
        
        <label htmlFor="filter">Zobrazit úkoly:</label>

        <select id="filter" onChange={this.filter}>
          <option value="all">Všechny</option>
          <option value="incompleted">Nesplněné</option>
          <option value="completed">Splněné</option>
        </select>

        {this.state.toDos && 
        <div id="tasks">
          {(this.state.filter === "all" && this.state.toDos) && this.state.toDos.map((toDo, index) => (
            <Task key={index} task={toDo}/>
          ))}
          {this.state.filter === "completed" && this.state.toDos.map((toDo, index) => (
            toDo.completed === true && <Task key={index} task={toDo}/>
          ))}
          {this.state.filter === "incompleted" && this.state.toDos.map((toDo, index) => (
            toDo.completed === false && <Task key={index} task={toDo}/>
          ))}
        </div> }
      </div>
    );
  }
}