import { SET_MSG } from "../actions/index";
function tradeReducers(state = {}, action) {
    switch (action.type) {
        case SET_MSG:
            return action.payload
        default:
            return state
    }
}
export default tradeReducers;