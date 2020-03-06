import * as types from '../constant/actionTypes'
const inititalState = JSON.parse(localStorage.getItem('tasks')) || []
const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
const generateId = () => {
    return s4() + s4() + '-' + s4() + s4() + s4() + s4() + '-' + s4() + s4();
}
const findIndex = (tasks, id) => {
    return tasks.findIndex(task => task.id === id)
}
const MyReducer = (state = inititalState, action) => {
    switch (action.type) { //no-unreachable
        case types.ALL_TASKS:
            return state;
        case types.ADD_TASK:
            const newTask = {
                id: generateId(),
                isDone: false,
                content: action.task.content,
                level: +action.task.level || 0
            }
            state = [{ ...newTask }, ...state]
            localStorage.setItem('tasks', JSON.stringify(state))
            return state;
        case types.ISDONE_TASK:
            const i = findIndex(state, action.id)
            let item = state[i]
            item.isDone = !item.isDone
            state = [
                ...state.slice(0, i),
                { ...item },
                ...state.slice(i + 1)
            ]
            localStorage.setItem('tasks', JSON.stringify(state))
            return state;
        case types.DELETE_TASK:
            const taskDeleteId = findIndex(state, action.id);
            state = [...state.slice(0, taskDeleteId), ...state.slice(taskDeleteId + 1)]
            localStorage.setItem('tasks', JSON.stringify(state))
            return state;

        case types.UPDATE_TASK:
            let updateTask = {}
            const taskeditingId = findIndex(state, action.task.id)
            updateTask = {
                ...state[taskeditingId],
                ...action.task
            }
            state = [
                ...state.slice(0, taskeditingId),
                { ...updateTask },
                ...state.slice(taskeditingId + 1)
            ]
            localStorage.setItem('tasks', JSON.stringify(state))
            return state;
        default: return state;
    }
}
export default MyReducer