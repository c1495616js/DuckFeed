import axios from 'axios';

// const baseURL = process.env.API_HOST || 'http://localhost:8000/index.php/';
const baseURL = 'api/index.php/';

const Api = axios.create({
  baseURL
});

if(localStorage.getItem('ACCESS_TOKEN')){
  Api.defaults.headers.common['Authorization'] = localStorage.getItem('ACCESS_TOKEN');
}


export default Api;

