import axios from 'axios';

// let base = 'http://82.157.150.120:8081';
let base = 'http://127.0.0.1:8443';

export const requestLogin = params => {
    return axios({
            method: 'POST',
            url: `${base}/login`,
            auth: params
        })
        .then(res => res.data);
};

export const userLogin = params => {
    return axios.post(`${base}/user/login`, params)
}

export const userTest = params => {
    return axios.post(`${base}/user/test`, params);
}

export const getRoomInfo = params => {
    return axios.post(`${base}/monitor/getDataBetweenTimeForRoom`, params);
}



// 下面都是样例

// export const setpwd = params => {
//     return axios.post(`${base}/setpwd`, params);
// };

// export const userLogout = params => {
//     return axios.get(`${base}/logout`, { params: params });
// };

// export const requestRegister = params => {
//     return axios.post(`${base}/register`, params);
// }

// export const getUserListPage = params => {
//     return axios.get(`${base}/user/listpage`, params);
// };


// export const getTaskuser = params => {
//     return axios.get(`${base}/taskuser/listpage`, { params: params })
// }

// export const getActionlist = params => {
//     return axios.get(`${base}/action/listpage`, { params: params })
// }

// export const rechargeKeylist = params => {
//     return axios.post(`${base}/keylist/recharge`, params)
// }

// export const getMissionlist = params => {
//     return axios.get(`${base}/mission/listpage`, { params: params })
// }

// export const addMission = params => {
//     return axios.post(`${base}/mission/addlist`, params)
// }