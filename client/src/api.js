import axios from 'axios';

//before the request thise event are being handled//////////////////////////////////////////

axios.interceptors.request.use(
    function (config) {
        const { origin } = new URL(config.url);
        const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT];
        const token = localStorage.getItem('access-token');

        if (allowedOrigins.includes(origin)) {
            config.headers.Authorization = token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)
///////////////////////////////////////////////////////////////////////////////////////////
export const fetchRegister = async (input) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`, input);
    return data;
}

export const fetchMe = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`);
    return data;
}
export const fetchLogout = async () => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`, {
        refresh_token: localStorage.getItem("refresh-token"),
    }
    )
    return data;

}
export const fetchLogin = async (input) => { 
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`, input);
    return data;
}
export const fetchCreateTask = async (input) =>{
    // if file objects are present, send multipart/form-data
    let body = input;
    let config = {};
    const hasFiles = input && (input.fbaEtiket || input.dhlEtiket);

    if (hasFiles) {
        const form = new FormData();
        Object.keys(input).forEach((key) => {
            const val = input[key];
            if (val === undefined || val === null) return;
            // File objects from browser
            if (typeof File !== 'undefined' && val instanceof File) {
                form.append(key, val);
            } else if (val && val._isAMomentObject) {
                // moment objects (if any) -> toISOString
                form.append(key, val.toISOString());
            } else {
                form.append(key, val);
            }
        });
        body = form;
        config = { headers: { 'Content-Type': 'multipart/form-data' } };
    }

    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/task`, body, config);
    return data;
}

export const fetchUpdateTask = async (id, input) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_ENDPOINT}/task/${id}`, input);
    return data;
}

export const fetchTask = async () => {
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/task`);
    return data;
}
export const fetchDeleteTask = async (task_id) => {
    const {data} = await axios.delete(`${process.env.REACT_APP_BASE_ENDPOINT}/task/${task_id}`);
    return data;
}
export const fetchUser = async () => {
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/auth`);
    return data;
}



