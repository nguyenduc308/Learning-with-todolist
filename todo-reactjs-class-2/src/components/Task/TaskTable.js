import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, FormControl } from 'react-bootstrap'
import TaskItem from './TaskItem'
import { LEVEL } from '../../constant/level'
export class TaskTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fil_content: '',
            fil_level: -1,
            fil_isDone: -1,
        }
    }
    static propTypes = {
        tasks: PropTypes.array.isRequired
    }
    onChange = (e) => {
        this.props.onFilter({type:e.target.name, value: e.target.value})
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { tasks, onDone, onDelete, onEdit } = this.props;
        const { fil_content, fil_isDone, fil_level} = this.state;
        const injectPropsItem = { onDone, onDelete, onEdit };
        return (
            <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Content</th>
                    <th>Level</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td><FormControl 
                        name = "fil_content"
                        value = { fil_content }
                        onChange = {this.onChange}
                    /></td>
                    <td><FormControl 
                        as = "select"
                        name = "fil_level"
                        value = { fil_level }
                        onChange = {this.onChange}
                        >
                            <option value={-1}>Tất cả</option>
                            {LEVEL.map((e,i) => {
                                return <option key={i} value={i}>
                                    {e.name}
                                </option>
                            })}
                        </FormControl></td>
                    <td><FormControl 
                        as = "select"
                        name = "fil_isDone"
                        value = { fil_isDone }
                        onChange = {this.onChange}
                        >   
                            <option value={-1}>Tất cả</option>
                            <option value={true}>Xong</option>
                            <option value={false}>Chưa xong</option>
                        </FormControl></td>

                    <td></td>
                </tr>
                {tasks && tasks.map((task,i) => {
                    return <TaskItem key={task.id} index={i} {...task} {...injectPropsItem}/>
                })}
            </tbody>
        </Table>
        )
    }
}

export default TaskTable
