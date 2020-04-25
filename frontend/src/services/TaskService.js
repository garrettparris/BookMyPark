import HttpService from './HttpService';

class TaskService {

    constructor() {
        this.httpService = new HttpService();
    }

    getTasks(id) {
        const url = process.env.REACT_APP_API + '/task';
        const params = { _id: id };
        return this.httpService.getRequest(url, {}, params);
    }

    editTasks(id, name, description, groups, days, user_id) {
        const url = process.env.REACT_APP_API + '/task';
        const params = { _id: id };
        const body = {
            name: name,
            description: description,
            groups: groups,
            days: days,
            user_id: user_id,
        }
        return this.httpService.postRequest(url, {}, params, body);
    }

    postTask(name, description, groups, days, user_id){
        const url = process.env.REACT_APP_API + '/task';
        const body = {
            name: name,
            description: description,
            groups: groups,
            days: days,
            user_id: user_id
        }
        return this.httpService.postRequest(url, {}, {}, body);
    }

    deleteTask(taskId){
        const url = process.env.REACT_APP_API + '/task';
        const params = { _id: taskId };
        return this.httpService.deleteRequest(url, {}, params, {});
    }
}

export default TaskService;