import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { LEVEL } from '../../constant/level'
export class TaskItem extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired,
        isDone: PropTypes.bool.isRequired,
        content: PropTypes.string.isRequired,
    }
    _onDone = (id) => {
        this.props.onDone(id);
    }
    _onDelete = (id) => {
        const isConfirm = window.confirm("Are you sure delete it, you will can not restore ?");
        !isConfirm || this.props.onDelete(id)
    }
    _onEdit = (id) => {
        this.props.onEdit(id)
    }
    render() {
        const {
            id,
            level,
            index,
            isDone,
            content,
        } = this.props;
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

export default TaskItem
