import React, { Component } from 'react';
import Task from './Task';
class TasksTable extends Component {
    render() {
        const { 
            items,
            eLevel,
            setDone,
            editing,
            editTask, 
            setLevel,
            deleteTask,
            updateTask,
            eContent,
            setContent, 
            cancelEditTask} = this.props;
        const injectedPropsItem = {
            eLevel,
            setDone,
            editing,
            setLevel,
            editTask,
            eContent,
            deleteTask,
            setContent,
            updateTask,
            cancelEditTask
        }
        return (
            <table className="classic-table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Content</td>
                        <td>Level</td>
                        <td>Status</td>
                        <td>Date</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item,index) => {
                        return <Task 
                            key={item.id} 
                            {...item}
                            {...injectedPropsItem}
                            index={index}/>
                    })}
                </tbody>
            </table>
        )
    }
}

export default TasksTable
