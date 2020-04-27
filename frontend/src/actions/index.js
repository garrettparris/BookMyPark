
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
