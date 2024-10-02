import axios from 'axios';

const BACKEND_PROTOCOL = import.meta.env.VITE_BACKEND_PROTOCOL as string;
const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST as string;
const API_KEY = import.meta.env.VITE_BACKEND_API_KEY as string;

axios.defaults.baseURL = `${BACKEND_PROTOCOL}://${BACKEND_HOST}`;

axios.defaults.headers.common['X-Api-Key'] = API_KEY;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;