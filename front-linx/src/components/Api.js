import axios from 'axios';

const Api = axios.create({ baseURL: 'https://localhost:44364/v1/city' });

export default Api;
