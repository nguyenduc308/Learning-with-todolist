import React, { Component } from 'react';
import './App.css';
import './grid.css';
import TasksTable from './components/tasks/TasksTable'
import Section from './components/layout/Section';
import Grid from './components/layout/Grid'
class App extends Component {
    state ={
        items: [
        {id:123, content: "Đi làm", level: 1, isDone: true, date: "4/3"},
        {id:1232213, content: "Chơi game", level: 0, isDone: false, date: "4/3"},
        {id:1232214, content: "Code", level: 0, isDone: false, date: "4/3"},
        ],
        value: {
            level: 1,
            content:'',
            editting:''
        }
    }
    setLevel = (index) => {
        this.setState({
            value: {
                ...this.state.value,
                level: index
            }
        })
    }
    setContent = (e) => {
        this.setState({
            value: {
                ...this.state.value,
                content: e.target.value
            }
        })
    }
    updateTask = (id)=> {
        const { items } = this.state
        const index = items.findIndex(item => item.id===id)
        const item = items[index];
        this.setState({
            items: [
                ...items.slice(0,index),
                {...item, content: this.state.value.content, level: this.state.value.level},
                ...items.slice(index+1)
            ],
            value: {
                content:"",
                editing:"",
                level: 0
            }
        })
    }
    addNewTask = () => {
        if(!this.state.value.content.trim()) return alert("You can't create new task because the content is empty!")
        const id=Math.floor(Math.random()*1000000).toString(16).substring();
        this.setState({
            items: [     
                {   id, 
                    content: this.state.value.content,
                    level: this.state.value.level,
                    isDone: false,
                    date: new Date().getDate() + "/" + new Date().getMonth()
                },
                ...this.state.items
            ],
            value: {
                level: 0,
                content:""
            }
        })
    }
    setDone = (id) => {
        const { items } = this.state
        const index = items.findIndex(item => item.id===id)
        const item = items[index];
        this.setState({
            items: [
                ...items.slice(0,index),
                {...item, isDone: !item.isDone},
                ...items.slice(index+1)
            ]
        })
    }
    editTask = (id) => {
        const { items } = this.state
        const index = items.findIndex(item => item.id===id)
        this.setState({
            value: {
                ...this.state.value,
                editing: id,
                content: items[index].content,
                level: items[index].level
            }
        })
    }
    cancelEditTask = () => {
        this.setState({
            value: {
                ...this.state.value,
                level: 0,
                content: "",
                editing:""
            }
        })
    }
    deleteTask = (id) => {
        const { items } = this.state
        const index = items.findIndex(item => item.id===id)
        const isConfirm = window.confirm("Do you want to delete ?")
        console.log(isConfirm);
        if(!isConfirm) return;
        this.setState({
            items:[
            ...items.slice(0,index),
            ...items.slice(index+1)
            ]
        })
    }
    render() {
        const injectPropsSection = {
            level: this.state.value.level,
            setLevel: this.setLevel,
            content: this.state.value.content,
            setContent: this.setContent,
            addNewTask: this.addNewTask,
            cancelEditTask: this.cancelEditTask
        }
        const injectPropsTable = {
            items: this.state.items,
            eContent:this.state.value.content,
            eLevel:this.state.value.level,
            setContent:this.setContent,
            setLevel: this.setLevel,
            editing: this.state.value.editing,
            setDone: this.setDone,
            editTask: this.editTask,
            updateTask: this.updateTask,
            deleteTask: this.deleteTask,
            cancelEditTask: this.cancelEditTask
        }
        return(
            <>
                <header className="header">
                <div className="grid wide header-content">
                    <div className="logo">
                    <h2>Todo Today ReactJS class</h2>
                    </div>
                </div>
                </header>
                <section className="section">
                    <Grid>
                        <Section {...injectPropsSection}/>
                    </Grid>
                </section>
                <div className="container">
                    <Grid>
                        <TasksTable {...injectPropsTable}/>
                    </Grid>
                </div>
            </>
        )
    }
}

export default App;
