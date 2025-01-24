import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  headers: {
    'SameSite': 'Strict'
  }
});

export default instance;