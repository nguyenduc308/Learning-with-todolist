import React, { Component } from 'react'    
import { Button } from 'react-bootstrap'
import { LEVEL } from '../../constant/level'
import {connect} from 'react-redux'
import * as actions from '../../actions'
export class TaskItem extends Component {
    _onDone = (id) => {
        this.props.onDone(id);
    }
    _onDelete = (id) => {
        const isConfirm = window.confirm("Are you sure delete it, you will can not restore ?");
        !isConfirm || this.props.onDelete(id)
    }
    _onEdit = (id) => {
        this.props.onOpenForm();
        this.props.onEdtingTask(this.props.task)
    }
    render() {
        const {index, task} = this.props;
        const {
            id,
            level,
            isDone,
            content,
        } = task;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{content}</td>
                <td><span className={LEVEL[level].style}>{LEVEL[level].name}</span></td>
                <td 
                onClick={()=> this._onDone(id)}
                style={{cursor:"pointer"}}
                >
                    {isDone ? <i className="green fas fa-check"></i> : <i className="fas fa-ellipsis-h"></i>}
                </td>
                <td>
                    <Button 
                    variant="warning mr-2"
                    onClick={() => this._onEdit(id)}
                    ><i className="fas fa-edit"></i></Button>
                    <Button 
                    variant="danger"
                    onClick={ ()=> this._onDelete(id) }
                    ><i className="fas fa-trash-alt"></i></Button>
                </td>
            </tr>
        )
    }
}
const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onDone: id => dispatch(actions.isDone(id)),
        onDelete: id => dispatch(actions.deleteTask(id)),
        onEdit: id => dispatch(actions.updateTask(id)),
        onOpenForm: id => dispatch(actions.openForm()),
        onEdtingTask: task => dispatch(actions.editingTask(task))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskItem)
