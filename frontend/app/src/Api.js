import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:8000/index.php/'
});

if(localStorage.getItem('ACCESS_TOKEN')){
  Api.defaults.headers.common['Authorization'] = localStorage.getItem('ACCESS_TOKEN');
}


export default Api;

