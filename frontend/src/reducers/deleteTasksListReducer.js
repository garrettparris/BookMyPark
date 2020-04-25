export default (state={}, action) => {
    switch (action.type) {
        case 'DELETE_TASK':
            return action.payload;
        default:
            return state;
    }
};
