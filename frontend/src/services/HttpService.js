import axios from 'axios';

class HttpService {

  getRequest = async(url, header, params) => axios({
      method: 'get',
      url,
      params,
    })
      .then((response) => response.data)
      .catch((error) => error);

  postRequest = async(url, header, params, body) => axios({
      method: 'post',
      header,
      params,
      url,
      data: body,
    })
      .then((response) => response.data)
      .catch((error) => error);

  putRequest = async(url, header, params, body) => axios({
      method: 'put',
      header,
      params,
      url,
      data: body,
    })
      .then((response) => response.data)
      .catch((error) => error);

  deleteRequest = async(url, header, params, body) => axios({
      method: 'delete',
      header,
      params,
      url,
      data: body,
    })
      .then((response) => response.status)
      .catch((error) => error);
}

export default HttpService;
