import * as types from '../constant/actionTypes'
const inititalState = {
    id: "",
    content: "",
    level: 0
}

const MyReducer = (state=inititalState, action) => {
    switch (action.type) {
        case types.EDITING_TASK:
            return action.task;
        default: return state;
    }
}
export default MyReducer