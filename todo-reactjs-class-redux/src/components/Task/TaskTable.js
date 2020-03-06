import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, FormControl } from 'react-bootstrap'
import TaskItem from './TaskItem'
import { LEVEL } from '../../constant/level'
import { connect } from 'react-redux'
export class TaskTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDisplayBar: true,
            fil_content: "",
            fil_level: -1,
            fil_isDone: "all",
            keywords:""
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
        let { fil_content, fil_isDone, fil_level} = this.state;
        let { tasks } = this.props;
        if(this.props.keywords) {
            tasks = tasks.filter(task =>  task.content.toLowerCase().indexOf(this.props.keywords.toLowerCase()) !== -1)
        }
        if(fil_content) {
            tasks = tasks.filter(task =>  task.content.toLowerCase().indexOf(fil_content.toLowerCase()) !== -1)
        }
        if(fil_level >-1) {
            tasks = tasks.filter(task => task.level === +fil_level)
        }
        if(fil_isDone !== "all") {
            fil_isDone = fil_isDone === "true" ? true : false;
            tasks = tasks.filter(task => task.isDone === fil_isDone )
        }

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
                <tr style={this.state.isDisplayBar? null : { display:"none" }}>
                    <td></td>
                    <td><FormControl 
                        name = "fil_content"
                        value = { fil_content }
                        onChange = {this.onChange}
                        placeholder = "Quick search"
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
                            <option value="all">Tất cả</option>
                            <option value={true}>Xong</option>
                            <option value={false}>Chưa xong</option>
                        </FormControl></td>

                    <td onClick={()=>this.setState({...this.state, isDisplayBar: false})}>
                        <span className="badge badge-secondary" style={{cursor:"pointer"}}>Hide Bar
                    </span></td>
                </tr>
                {tasks && tasks.map((task,i) => {
                    return <TaskItem key={task.id} index={i} task={task}/>
                })}
            </tbody>
        </Table>
        )
    }
}
const mapStateToProps = (state) => {
    return { 
        tasks: state.tasks,
        keywords: state.search
     }
}

export default connect(mapStateToProps, null)(TaskTable)
