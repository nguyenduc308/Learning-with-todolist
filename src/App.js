import React, { Component } from 'react';
import './App.css'
import TaskForm from './components/taskForm';
import Controls from './components/controls';
import TaskList from './components/taskList'
class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        tasks: [],
        isHiddenForm: !0,
        taskEditting: null,
      }
  }  
  UNSAFE_componentWillMount() {
      localStorage && localStorage.getItem('tasks') && this.setState({
          tasks: JSON.parse(localStorage.getItem('tasks'))
      })
  }
  onGenerateData = () => {
      const tasks = [
          {
              id: this.generateId(),
              name: 'Làm việc',
              status: !1,
          },
          {
              id: this.generateId(),
              name: 'Ngủ',
              status: !1,
          },
          {
              id: this.generateId(),
              name: 'Học',
              status: !0,
          },
      ]
      this.setState({
          tasks:tasks,
      })
      localStorage.setItem('tasks',JSON.stringify(tasks))
  }
  s4() {
      return Math.floor((1+Math.random())*0x1000).toString(16).substring(1)
  }
  generateId() {
      return this.s4() + '-' + this.s4() + '-' + this.s4()
  }
  onToggleForm = () => {
      this.setState({
          isHiddenForm: !this.state.isHiddenForm
      })
  }
  onSubmit = (task) => {
      const { tasks } = this.state;
      const updateTasks = [...tasks,{id:this.generateId(),...task}]
      this.setState({
          tasks: updateTasks,
          isHiddenForm: true
      })
      localStorage.setItem('tasks', JSON.stringify(updateTasks))
      
  }
  onUpdateStatus = (id) => {
        const index = this.findIndex(id);
        const {tasks} = this.state;
        if(index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks: tasks
            })
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
  }
  onDeleteTask = (id) => {
    const index = this.findIndex(id);
    let {tasks} = this.state;
    tasks.splice(index,1)
    if(index !== -1) {
        this.setState({
            tasks: tasks
        })
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    this.onCloseForm();
  }
  findIndex = (id) => {
      const {tasks} = this.state;
      let result = -1;
      tasks.forEach((task, index)=>{
          if(task.id === id) {
            return result = index
          }
      })
      return result;
  }
  onCloseForm = () => {
      this.setState({
          isHiddenForm: !this.state.isHiddenForm
      })
  }
  onOpenForm = () => {
    this.setState({
        isHiddenForm: false
    })
  }
  onUpdateTask = (id) => {
    const index = this.findIndex(id);
    const {tasks} = this.state;
    if(index !== -1) {
        const taskEditting = tasks[index]
        this.setState({
            taskEditting: taskEditting
        })
    }
    this.onOpenForm();
  }
  componentDidUpdate() {
      console.log(this.state)
  }
  render() {
    const {tasks, isHiddenForm, taskEditting} = this.state;
    return (
           <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className={!isHiddenForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4":""}>
               {!isHiddenForm && <TaskForm  onSubmit={this.onSubmit} task={taskEditting}/>}
            </div>
            <div className={!isHiddenForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>
                <button type="button" className="btn btn-warning ml-5" onClick={this.onGenerateData}>
                    Gennerate Data
                </button>
                <div className="row mt-15">
                   <Controls />
                </div>
                <div className="row mt-15">
                    <TaskList 
                        tasks={ tasks } 
                        onUpdateStatus = {this.onUpdateStatus}
                        onDeleteTask = {this.onDeleteTask}
                        onUpdateTask = {this.onUpdateTask}
                    />
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default App;