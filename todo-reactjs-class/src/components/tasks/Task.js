import React, { Component } from 'react'
import PropTypes from 'proptypes'
import { LEVEL, IS_DONE } from '../../constant/Task'
class Task extends Component {
    static propTypes = {
        content: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        isDone: PropTypes.bool.isRequired,
        date: PropTypes.string.isRequired
    }

    render() {
        const {
            index, 
            id, 
            level,
            content,
            eContent, 
            eLevel,
            isDone, 
            date, 
            setDone, 
            deleteTask, 
            editTask, 
            editing, 
            setContent, 
            setLevel, 
            updateTask,
            cancelEditTask } = this.props;
        return (
            <tr className={editing===id?"bg-gray": ""}>
                <td>{index + 1}</td>
                <td>{editing===id ? <input 
                                name="content" 
                                value={eContent} 
                                onChange={(e)=>setContent(e)}
                                className="form-control form-editing"
                                /> :content}</td>
                <td className="d-flex content-center">{editing===id ? LEVEL.map((e,i) => {
                            return (
                            <span key={i}
                            className={`
                            select-box__item 
                            ${e.style} 
                            ${eLevel===i?"selected":""}`}
                            onClick = {()=>setLevel(i)}
                            >{e.name}</span>
                            )
                        }): <span  className={LEVEL[level].style}>{LEVEL[level].name}</span>
                }</td>
                <td><i 
                    className={isDone ? IS_DONE[1]: [IS_DONE[0]]}
                    onClick={()=>setDone(id)}
                    ></i></td>
                <td>{date}</td>
                <td>
                    {editing===id ? 
                    <>
                    <button onClick={()=>updateTask(id)}>Update</button>
                    <button onClick={()=>cancelEditTask(id)}>Cancel</button></>
                    :
                    <>
                    <button onClick={()=>editTask(id)}>Edit</button>
                    <button onClick={()=>deleteTask(id)}>Delete</button>
                    </>}
                    
                </td>
            </tr>
        )
    }
}

export default Task
