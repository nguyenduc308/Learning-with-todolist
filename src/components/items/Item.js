import React from 'react'

const Item = ({name, isDone, level,index,checkDone,deleteItem,getEditItem}) => {
    const onDone = (id) => {
       checkDone(id);
    }
    const onDelete = (index) => {
        deleteItem(index);
    }
    let labelClassName = "badge badge--success";
    switch (level) {
        case "Mid":
            labelClassName = "badge badge--warning"
            break;
        case "High":
            labelClassName = "badge badge--danger"
            break;
        default:
            labelClassName = "badge badge--success"
    }
    return (
        <>
            <tr> 
                <td>{index+1}</td>
                <td>{isDone?<span className="line-through opacity">{name}</span> : <span>{name}</span>}</td>
                <td><span className={labelClassName}>{level}</span></td>
                <td 
                onClick={()=> onDone(index)}>{isDone?<i className="fas fa-check-circle" style={{color:"#13aa52"}}/>: <i className="fas fa-check-circle" style={{color:"#cccccc"}}/>}</td>
                <td className="task-action">
                    <button 
                    className="btn btn--secondary mr-10" 
                    onClick={()=>{getEditItem(index)}
                    }>Edit</button> 
                    <button className="btn btn--dark" onClick={()=>onDelete(index)}>Delete</button>
                </td>
            </tr>
        </>
    )
}

export default Item