import * as types from '../constant/actionTypes'
const inititalState = false;

const MyReducer = (state=inititalState, action) => {
    switch (action.type) {
        case types.TOGGLE_FORM:
            state = !state
            return state;
        case types.OPEN_FORM:
            return true;
        case types.CLOSE_FORM:
            return false

        default: return state;
    }
}
export default MyReducer