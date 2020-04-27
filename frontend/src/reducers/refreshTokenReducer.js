export default (state='', action) => {
    switch (action.type) {
        case 'REFRESH_TOKEN':
            return action.payload;
        default:
            return state;
    }
};
