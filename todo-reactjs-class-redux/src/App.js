import React, { Component } from 'react';
import './App.css';
import HeaderContent from './components/Layout/HeaderContent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux'
import * as actions from './actions'
import { Container, Row, Col } from 'react-bootstrap'
import TaskForm from './components/Task/TaskForm';
import TaskControl from './components/Task/TaskControl';
import TaskTable from './components/Task/TaskTable';
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: {
                type: "",
                value: -1
            }
        }
    }
    saveTasks = (data) => {
        return localStorage.setItem('tasks', JSON.stringify(data))
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
    onToggleForm = () => {
        if(this.props.taskEditing && this.props.taskEditing.id) {
            this.props.onOpenForm()
        } else {
            this.props.onToggleForm()
        }
        this.props.onClearTaskEdit({
            id: "",
            content: "",
            level: 0
        })
    }
    render() {
        const { isDisplayForm  } = this.props;
        // let { type, value } = this.state.filter;
        const injectPropsCtr = {
            onToggleForm: this.onToggleForm,
        }
        const injectPropsForm = {
            onCancelForm: this.props.onCloseForm,
        }
        const injectPropsTable = {
            onEdit: this.onEdit,
            onFilter: this.onFilter
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
const mapStatetoProps = state => {
    return {
        isDisplayForm: state.form,
        taskEditing: state.task
    
    }
}
const mapDispatchToProps = (dispatch) => {
   return { 
        onToggleForm: () => dispatch(actions.toggleForm()),
        onCloseForm: () => dispatch(actions.closeForm()),
        onOpenForm: () => dispatch(actions.openForm()),
        onClearTaskEdit: task => dispatch(actions.editingTask(task)),
   }
}
export default connect(mapStatetoProps,mapDispatchToProps)(App);
