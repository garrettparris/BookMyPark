export default (state="", action) => {
    switch (action.type) {
        case 'ID':
            return action.payload;
        default:
            return state;
    }
};
