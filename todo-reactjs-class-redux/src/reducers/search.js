import * as types from '../constant/actionTypes'
const inititalState = ""

const MyReducer = (state=inititalState, action) => {
    switch (action.type) {
        case types.SEARCH_TASK:
            return action.keywords;
        default: return state;
    }
}
export default MyReducer