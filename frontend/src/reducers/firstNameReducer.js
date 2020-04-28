export default (state="", action) => {
    switch (action.type) {
        case 'FIRSTNAME':
            return action.payload;
        default:
            return state;
    }
};
