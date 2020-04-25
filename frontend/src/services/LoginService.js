import HttpService from './HttpService';

class LoginService {

    constructor() {
        this.httpService = new HttpService();
    }

    getUserId(login, password) {
        const url = process.env.REACT_APP_API + '/login';
        const params = { login: login, password: password };
        return this.httpService.getRequest(url, {}, params);
    }

    signUp(password, login, username) {
        const url = process.env.REACT_APP_API + '/user';
        const body = { login: login, username: username, password: password };
        return this.httpService.postRequest(url, {}, {}, body);
    }

    getUserName(_id) {
        const url = process.env.REACT_APP_API + '/username';
        console.log(process.env.REACT_APP_API + '/username');
        const params = { _id: _id };
        return this.httpService.getRequest(url, {}, params);
    }
}

export default LoginService;