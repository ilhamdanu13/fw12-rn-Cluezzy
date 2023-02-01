/* eslint-disable prettier/prettier */
import axios from 'axios';

const http = token => {
  const headers = {};
  if (token) {
    headers.authorization = 'Bearer ' + token;
  }
  const instance = axios.create({
    baseURL: process.env || 'https://fw12-backend-shr6.vercel.app/',
    headers,
  });
  return instance;
};

export default http;
