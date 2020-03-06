import { combineReducers } from 'redux';
import tasks from './tasks'
import task from './task'
import form from './form'
import search from './search'
const myReducer = combineReducers({
    tasks,
    task,
    form,
    search
})

export default myReducer;
