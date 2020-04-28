
export const login = (list) =>({
    type: 'LOGGED_IN',
    payload: list,
});

export const setAccessToken = (token) =>({
    type: 'ACCESS_TOKEN',
    payload: token,
});

export const setRefreshToken = (token) =>({
    type: 'REFRESH_TOKEN',
    payload: token,
});
export const setUserId = (token) =>({
    type: 'ID',
    payload: token,
});
export const setEmail = (token) =>({
    type: 'EMAIL',
    payload: token,
});
export const setFirstName = (token) =>({
    type: 'FIRSTNAME',
    payload: token,
});
export const setUserName = (token) =>({
    type: 'USERNAME',
    payload: token,
});
