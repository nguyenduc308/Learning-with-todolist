import React, { useState } from 'react';
import Item from './Item';
const ListItem = () => {
    const itemsList = [
            {id:1,name: "Đi chơi với Phương", isDone: true, level: "High", state: 1},
            {id:2,name: "Đi học với Phương", isDone: true, level: "Mid", state: 2},
            {id:3,name: "Đi làm với Phương", isDone: false, level: "Low", state: 3}
         ]
    const [items, setItems] = useState(itemsList)
    const [values, setValues] = useState({taskName:"", level:"Low", keySearch:""})
    const [disPlay, setDisplay] = useState(false)
    const [editButton, setEditButton] = useState(false);
    const onDisplay = () => {
        setDisplay(!disPlay)
        setEditButton(false)
        setValues({taskName:"", level:"Low", keySearch:""})
    }
    const onCancel = () => {
        setDisplay(false)
        setEditButton(false)
    }
    const checkDone = (id) => {
        const item = items[id];
        setItems([
            ...items.slice(0,id),
            {...item, isDone: !item.isDone},
            ...items.slice(id + 1)
        ])

    }
    const tasksSearch = (e) => {
        e.preventDefault()
        let matchItems = items.filter(item => {
            return item.name.toLocaleLowerCase().indexOf(values.keySearch.toLocaleLowerCase()) !== -1;
        })
        setItems(matchItems)
    }
    const onChange = (e) => {
        setValues({...values,[e.target.name]: e.target.value})
    }
    const addItem = (e) => {
        e.preventDefault()
        setItems([
            ...items,
            {id:Math.random(), name: values.taskName, isDone:false, level: values.level}
        ])
        setValues({
            ...values,
            taskName: ""
        })
    }
    const getEditItem = (id) => {
        setDisplay(false)
        setEditButton(true)
        const item = items[id];
        setValues({
            ...values,
            taskName: item.name,
            level: item.level,
            id:id
        })
    }
    const editItem = (e) => {
        e.preventDefault()
        const id = values.id
        const item = items[id];
        setItems(() => [
            ...items.slice(0,id),
            {...item,name:values.taskName, level:values.level},
            ...items.slice(id+1)
        ])
        setDisplay(false)
        setEditButton(false)
        setValues({
            ...values,
            taskName: "",
            level: "Low",
            id: ""
        })
    }
    const deleteItem = (id) => {
        setItems([
            ...items.slice(0,id),
            ...items.slice(id+1)
        ])
    }
    return (
        <>
            <div className="d-flex list-control">
                <div className="list-control__box">
                    <div className="list-control__title">
                        <h1>Todo List by <i className="fab fa-react"></i></h1>
                    </div>
                    <form className="search-form" onSubmit={tasksSearch}>
                        <div className="form-group mr-10">
                            <input 
                            type="text" 
                            name="keySearch" 
                            id="tasks-search"
                            className="form-control"
                            placeholder="Search tasks"
                            value={values.keySearch}
                            onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                            type="submit" 
                            className="form-control"
                            value="Search"
                            />
                        </div>
                    </form>
                </div>
                <div className="list-control__box">
                {disPlay || <button className="btn btn--primary" onClick={onDisplay}>Add task</button>}
                {disPlay && <form className="add-item-form" onSubmit={addItem}>
                    <div className="form-group">
                        <input 
                        type="text" 
                        id="taskName" 
                        name="taskName"
                        className="form-control 
                        mr-10" required
                        value={values.taskName}
                        onChange={onChange}
                        />
                        <label htmlFor="taskName">Task name</label>  
                    </div>
                    <div className="form-group">
                        <select className="form-control mr-10" name="level" value={values.level} onChange={onChange}>
                            <option value="Low">Low</option>
                            <option value="Mid">Mid</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="form-group d-flex">
                        <button type="submit" className="btn btn--primary mr-10">Create</button>
                        <button className="btn btn--dark" onClick={onCancel}>Cancel</button>
                    </div>
                </form>}
                {editButton && <form className="add-item-form" onSubmit={editItem}>
                    <div className="form-group">
                        <input 
                        type="text" 
                        id="taskName" 
                        name="taskName"
                        className="form-control 
                        mr-10" required
                        value={values.taskName}
                        onChange={onChange}
                        />
                        <label htmlFor="taskName">Edit task <strong>#{values.id}</strong></label>  
                    </div>
                    <div className="form-group">
                        <select className="form-control mr-10" name="level" value={values.level} onChange={onChange}>
                            <option value="Low">Low</option>
                            <option value="Mid">Mid</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="form-group d-flex">
                        <button type="submit" className="btn btn--primary mr-10">Update</button>
                        <button className="btn btn--dark" onClick={onCancel}>Cancel</button>
                    </div>
                </form>}
                </div>
            </div>
            <table className="table-classic mt-20">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tasks</th>
                    <th scope="col">Level</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item,i) => {
                        return (
                            <Item 
                            key={i} {...item} 
                            checkDone={checkDone} 
                            getEditItem = {getEditItem} 
                            editButton = {editButton}
                            deleteItem={deleteItem} 
                            index={i} 
                            />)
                        })
                    }
                </tbody>
                </table>
        </>
    )
}

export default ListItem
