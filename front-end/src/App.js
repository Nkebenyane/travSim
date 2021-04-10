import React from 'react';
import './App.css';

import Todolist from './components/ToDoList';
import ValidationForm from './components/ValidationForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTodoList: true,
      showForm: false
    };
    this.btnTodoList = this.btnTodoList.bind(this);
    this.btnForm = this.btnForm.bind(this);
  }

  btnTodoList() {
    this.setState({
      showTodoList: true,
      showForm: false,
    });
  }
  btnForm() {
    this.setState({
      showForm: true,
      showTodoList: false,
    });
  }

  render() {
    return (
      <div >
        <div className="hearder">
          <button className="btn" onClick={this.btnTodoList}>ToDo List </button>
          <button className="btn" onClick={this.btnForm}>ValidationForm</button>
        </div>

        <div className="container">
          {this.state.showTodoList ?
            <Todolist /> :
            null
          }
          {this.state.showForm ?
            <ValidationForm /> :
            null
          }
        </div>
      </div>
    );
  }
}
export default App;
