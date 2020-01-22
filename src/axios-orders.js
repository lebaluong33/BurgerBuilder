import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-56c22.firebaseio.com/'
});

export default instance;