import * as types from '../constant/actionTypes'
//form
export const  toggleForm = () => {
    return {
        type: types.TOGGLE_FORM
    }
}
export const  openForm = () => {
    return {
        type: types.OPEN_FORM
    }
}
export const  closeForm = () => {
    return {
        type: types.CLOSE_FORM,

    }
}

//task

export const allTasks = () => {
    return {
        type: types.ALL_TASKS
    }
}
export const  addTask = (task) => {
    return {
        type: types.ADD_TASK,
        task
    }
}
export const  isDone = (id) => {
    return {
        type: types.ISDONE_TASK,
        id
    }
}
export const  deleteTask = (id) => {
    return {
        type: types.DELETE_TASK,
        id
    }
}
export const  updateTask = (task) => {
    return {
        type: types.UPDATE_TASK,
        task
    }
}
export const  editingTask = (task) => {
    return {
        type: types.EDITING_TASK,
        task
    }
}
export const  searchTask = (keywords) => {
    return {
        type: types.SEARCH_TASK,
        keywords
    }
}
