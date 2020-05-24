import React from "react";
import InformationModal from "./modals/InformationModal";
import Button from "react-bootstrap/Button";

export default class TasksPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            informationModalOpen: false,
        }
        this.taskDone = this.taskDone.bind(this)
        this.handleModalOptionClose = this.handleModalOptionClose.bind(this)
    }

    taskDone() {
        const task = {
            description: this.props.task.description,
            completed: true
          }
        const url = "/api/tasks/" + this.props.task._id
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

    handleSuccesfulEdit() {
        this.setState(() => ({
          informationModalOpen: true
        }))
    }

    handleModalOptionClose(){
        this.setState(() => ({
            informationModalOpen: false
        }));
        window.location.reload();
    }

    render() {
        return (
            <div>
                <Button className="task_button" variant="outline-success" size="sm" type="button" onClick={this.taskDone}>Hotovo</Button>

                <InformationModal
                  show={this.state.informationModalOpen}
                  title={"Úkol splněn!"}
                  message={"Blahopřejeme."}
                  handleOk={this.handleModalOptionClose} 
                />
            </div>
        )
    }
}