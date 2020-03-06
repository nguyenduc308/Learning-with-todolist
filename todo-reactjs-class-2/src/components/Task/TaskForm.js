import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Card } from 'react-bootstrap'
import {LEVEL} from '../../constant/level'
class TaskForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:"",
            content: "",
            level: 0
        }
    }
    static propTypes = {
        onCancelForm: PropTypes.func.isRequired,
    }
    UNSAFE_componentWillMount() {
       this.props.taskEditing && this.setState({
            id: this.props.taskEditing.id,
            content: this.props.taskEditing.content,
            level: this.props.taskEditing.level,
        }
       )
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
       if(nextProps && nextProps.taskEditing.id) { 
           return this.setState(()=>({
               id: nextProps.taskEditing.id,
                content: nextProps.taskEditing.content,
                level: nextProps.taskEditing.level
                })
           )
        }
    }
    onClear = () => {
        this.setState({
            id:"",
            content:"",
            level:0
        })
    }
    _onCancel = () => {
        this.onClear();
        this.props.onCancelForm();
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addAndUpdateTask(this.state);
        this._onCancel()
    }
    render() {
        const {content, level, id} = this.state;
        return (
            <Card>
                <Card.Header>
                    {id ? "Edit:" : "Add new task:" }
                    <i 
                    className="fas fa-times"
                    style={{float:"right", cursor:"pointer"}}
                    onClick={ ()=>this._onCancel }
                    ></i>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Task content:</Form.Label>
                            <Form.Control 
                            name="content"
                            type="string" 
                            placeholder="Enter content" 
                            value={ content }
                            onChange = { (e)=>this.onChange(e) }
                            />
                        </Form.Group>

                        <Form.Group controlId="Form.ControlSelect1">
                            <Form.Label>Task Level</Form.Label>
                            <Form.Control 
                            as="select"
                            name="level"
                            value={level}
                            onChange={this.onChange}
                            >
                                {LEVEL.map((e,i) => {
                                    return <option key={i} value={i}>
                                        {e.name}
                                    </option>
                                })}
                            </Form.Control>
                        </Form.Group>
                        <div style={{ padding: "0 20%", display: "flex", justifyContent: "space-between" }}>
                            <Button variant="warning" type="submit">{id ? "Update task" : "Save task"} </Button>
                            <Button 
                            variant="secondary"
                            onClick={this._onCancel}
                            > Cancel </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

export default TaskForm
