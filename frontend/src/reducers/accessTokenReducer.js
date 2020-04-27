export default (state='', action) => {
    switch (action.type) {
        case 'ACCESS_TOKEN':
            return action.payload;
        default:
            return state;
    }
};
