import React, { Component } from 'react';
import './App.css';
import HeaderContent from './components/Layout/HeaderContent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'
import TaskForm from './components/Task/TaskForm';
import TaskControl from './components/Task/TaskControl';
import TaskTable from './components/Task/TaskTable';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            isDisplayForm: false,
            filter: {
                type: "",
                value: -1
            }
        }
    }
    s4() {
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateId() {
        return this.s4() + this.s4() + '-' + this.s4() + this.s4() + this.s4() + this.s4() + '-' + this.s4() + this.s4();
    }
    saveTasks = (data) => {
        return localStorage.setItem('tasks', JSON.stringify(data))
    }
    UNSAFE_componentWillMount() {
        if(localStorage.getItem('tasks')) {
            const tasks = JSON.parse(localStorage.getItem('tasks'))
            this.setState({
                tasks: tasks,
                taskEditing: null,
            })
        }       
    }
    onToggleForm = () => {
        this.setState({
            isDisplayForm: !this.state.isDisplayForm,
            taskEditing: null
        })
    }
    onCancelForm = () => {
        this.setState({
            isDisplayForm: false,
            taskEditing: null
        })
    }
    addAndUpdateTask = ({id,content, level}) => {
        if(!id) {
            this.setState({
                tasks: [
                    {
                        id: this.generateId(),
                        content: content,
                        level: +level,
                        date: new Date(),
                        isDone: false
                    },
                    ...this.state.tasks
                ]
            }, ()=> {
                this.saveTasks(this.state.tasks)
            })
        } else {
            const { tasks } = this.state;
            const i = tasks.findIndex(t => t.id === id);
            this.setState({
                tasks: [
                    ...tasks.slice(0,i),
                    {...tasks[i],content, level:+level},
                    ...tasks.slice(i+1)
                ],
                taskEditing: null
            },  ()=> {
                this.saveTasks(this.state.tasks)
            })
        }
        this.onCancelForm();
    }
    onDone = (id) => {
        const { tasks } = this.state;
        const i = tasks.findIndex(task => task.id === id)
        this.setState({
            tasks: [
                ...tasks.slice(0,i),
                {...tasks[i], isDone:!tasks[i].isDone},
                ...tasks.slice(i+1)
            ]
        }, ()=> {
            this.saveTasks(this.state.tasks)
        })
    }
    onEdit = (id) => {
        const { tasks } = this.state;
        const i = tasks.findIndex(task => task.id === id)
        this.setState({
            taskEditing: tasks[i],
            isDisplayForm: true,
        }, ()=> {
            this.saveTasks(this.state.tasks)
        })
    }
    onDelete = (id) => {
        const { tasks } = this.state;
        const i = tasks.findIndex(task => task.id === id)
        this.setState({
            tasks: [
                ...tasks.slice(0,i),
                ...tasks.slice(i+1)
            ]
        }, ()=> {
            this.saveTasks(this.state.tasks)
        })
    }
    //Filter
    onFilter = (obj) => {
        this.setState({
            filter: obj
        })
    }
    //Search
    onSearch = (keywords) => {
        console.log(keywords);
        this.setState({
            filter: {
                type: 'fil_content',
                value: keywords
            }
        })
    }
    render() {
        let { tasks, isDisplayForm  } = this.state;
        let { type, value } = this.state.filter;
        const injectPropsCtr = {
            onToggleForm: this.onToggleForm,
        }
        const injectPropsForm = {
            addAndUpdateTask: this.addAndUpdateTask,
            onCancelForm: this.onCancelForm,
            taskEditing: this.state.taskEditing
        }
        if(type === "fil_content" && value) {
            tasks = tasks.filter(task =>  task.content.toLowerCase().indexOf(value.toLowerCase()) !== -1)
        }
        if(type === "fil_level" && value >-1) {
            tasks = tasks.filter(task => task[type.split("_")[1]] === +value)
        }
        if(type === "fil_isDone" && value !==1) {
            value = value === "true" ? true : false;
            tasks = tasks.filter(task => task[type.split("_")[1]] === value)
        }

        const injectPropsTable = {
            tasks,
            onEdit: this.onEdit,
            onDone: this.onDone,
            onFilter: this.onFilter,
            onDelete: this.onDelete,
        }
        return (
            <>
                <header className="header">
                    <HeaderContent onSearch = {this.onSearch}/>
                </header>
                <section className="pt-5">
                    <h2 style={{ textAlign: "center" }}>Quản lý công việc bằng ReactJS</h2>
                </section>
                <Container className="pt-5">
                    <Row>
                        {isDisplayForm && <Col xs={4}>
                           <TaskForm {...injectPropsForm}/>
                        </Col>}
                        <Col xs={isDisplayForm ? 8 : 12}>
                            <Row xs={12} style={{display:"flex", justifyContent: "space-between"}}>
                                <TaskControl {...injectPropsCtr}/>
                            </Row>
                            <Row xs={12} className="pt-3">
                                <TaskTable { ...injectPropsTable }/>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default App;
