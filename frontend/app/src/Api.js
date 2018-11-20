import axios from 'axios';

// const baseURL = process.env.API_HOST || 'http://localhost:8000/index.php/';
let Api = axios;

if(process.env.NODE_ENV === 'production'){
  const baseURL = 'duckfeed.c1495616.com:8000/index.php/';
  Api = axios.create({
  baseURL
  });
}

if(localStorage.getItem('ACCESS_TOKEN')){
  Api.defaults.headers.common['Authorization'] = localStorage.getItem('ACCESS_TOKEN');
}

export default Api;

