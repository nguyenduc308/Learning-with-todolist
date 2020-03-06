import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Card } from 'react-bootstrap'
import { LEVEL } from '../../constant/level'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class TaskForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            content: "",
            level: 0
        }
    }
    static propTypes = {
        onCancelForm: PropTypes.func.isRequired,
    }
    onClear = () => {
        this.setState({
            id: "",
            content: "",
            level: 0
        })
    }
    UNSAFE_componentWillMount() {
        if (this.props.taskEditing) {
            return this.setState({
                id: this.props.taskEditing.id,
                content: this.props.taskEditing.content,
                level: this.props.taskEditing.level,
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.taskEditing.id) {
            return this.setState(() => ({
                id: nextProps.taskEditing.id,
                content: nextProps.taskEditing.content,
                level: nextProps.taskEditing.level
            })
            )
        } else {
            this.onClear()
        }
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
    onSubmit = (e, id) => {
        e.preventDefault();
        if (!id) {
            if(!this.state.content) return alert("Content task is required");
            this.props.onAddTask({
                ...this.state
            })
        } else {
            this.props.onUpdateTask({
                ...this.state
            })
        }
        this._onCancel()
    }
    render() {
        const { content, level, id } = this.state;
        if (!this.props.isDisplayForm) return null;
        return (
            <Card>
                <Card.Header>
                    {id ? "Edit:" : "Add new task:"}
                    <i
                        className="fas fa-times"
                        style={{ float: "right", cursor: "pointer" }}
                        onClick={this._onCancel}
                    ></i>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={(e) => this.onSubmit(e, id)}>
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Task content:</Form.Label>
                            <Form.Control
                                name="content"
                                type="string"
                                placeholder="Enter content"
                                value={content}
                                onChange={(e) => this.onChange(e)}
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
                                {LEVEL.map((e, i) => {
                                    return <option key={i} value={i}>
                                        {e.name}
                                    </option>
                                })}
                            </Form.Control>
                        </Form.Group>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button variant="warning" type="submit">{id ? "Update task" : "Save task"} </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}
const mapStateToProps = state => ({
    isDisplayForm: state.form,
    taskEditing: state.task
})

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask: (task) => dispatch(actions.addTask(task)),
        onCancelForm: () => dispatch(actions.closeForm()),
        onUpdateTask: task => dispatch(actions.updateTask(task))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)
